const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const User = require('../Models/user');
const Awsconfig = require('../Models/awsconfig');

const fields = [
  'name',
  'regno',
  'email',
  'phone',
  'program',
  'programcode',
  'regulation',
  'Major',
  'Minor',
  'AEC',
  'SEC',
  'VAC',
  'IDC',
  'major',
  'minor',
  'academicyear',
  'admissionyear',
  'rollno',
  'gender',
  'category',
  'state',
  'city',
  'district',
  'pincode',
  'guardianname',
  'guardianmobile',
  'guardianemail',
  'photo',
  'semester',
  'section'
];

const clean = (value) => String(value ?? '').trim();
const colidFilter = (colid) => ({ colid: Number(colid), role: 'Student' });
const upload = multer({ storage: multer.memoryStorage() });

const encodeS3Key = (key) => String(key || '').split('/').map(encodeURIComponent).join('/');
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === 'us-east-1') return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const valueFromBody = (body, field) => {
  const aliases = {
    major: ['major', 'Major'],
    minor: ['minor', 'Minor'],
    Major: ['Major', 'major'],
    Minor: ['Minor', 'minor']
  };
  const keys = aliases[field] || [field];
  for (const key of keys) {
    if (body[key] !== undefined) return body[key];
  }
  return '';
};

const buildPayload = (body = {}) => ({
  name: clean(body.name) || 'NA',
  regno: clean(body.regno) || 'NA',
  email: clean(body.email),
  phone: clean(body.phone) || 'NA',
  program: clean(body.program) || 'NA',
  programcode: clean(body.programcode) || 'NA',
  regulation: clean(body.regulation) || 'NA',
  Major: clean(valueFromBody(body, 'Major')) || 'NA',
  Minor: clean(valueFromBody(body, 'Minor')) || 'NA',
  AEC: clean(body.AEC || body.aec) || 'NA',
  SEC: clean(body.SEC || body.sec) || 'NA',
  VAC: clean(body.VAC || body.vac) || 'NA',
  IDC: clean(body.IDC || body.idc) || 'NA',
  academicyear: clean(body.academicyear) || 'NA',
  admissionyear: clean(body.admissionyear || body.academicyear) || 'NA',
  rollno: clean(body.rollno) || 'NA',
  gender: clean(body.gender) || 'Not specified',
  category: clean(body.category) || 'General',
  state: clean(body.state) || 'NA',
  city: clean(body.city) || 'NA',
  district: clean(body.district) || 'NA',
  pincode: clean(body.pincode) || 'NA',
  guardianname: clean(body.guardianname) || 'NA',
  guardianmobile: clean(body.guardianmobile) || 'NA',
  guardianemail: clean(body.guardianemail) || 'NA',
  photo: clean(body.photo),
  semester: clean(body.semester) || 'NA',
  section: clean(body.section) || 'NA',
  password: 'NA',
  role: 'Student',
  department: 'NA',
  status: 1,
  colid: Number(body.colid),
  user: clean(body.user),
  addedby: clean(body.user),
  institution: clean(body.institution),
  lastlogin: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))
});

const serialize = (row) => {
  const data = row.toObject ? row.toObject() : row;
  return {
    ...data,
    major: data.Major || '',
    minor: data.Minor || '',
    aec: data.AEC || '',
    sec: data.SEC || '',
    vac: data.VAC || '',
    idc: data.IDC || ''
  };
};

exports.uploadPhotoMiddleware = upload.single('photo');

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Select a photo to upload' });
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ msg: 'colid is required' });

    const extension = path.extname(req.file.originalname || '').toLowerCase();
    const allowedMime = ['image/jpeg', 'image/jpg', 'image/png'].includes(req.file.mimetype);
    const allowedExtension = ['.jpg', '.jpeg', '.png'].includes(extension);
    if (!allowedMime || !allowedExtension) {
      return res.status(400).json({ msg: 'Photo must be a JPG, JPEG, or PNG file' });
    }

    const config = await Awsconfig.findOne({
      colid,
      type: /^aws$/i,
      default: /^yes$/i
    }).lean();
    if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
      return res.status(400).json({ msg: 'Default AWS configuration is missing or incomplete' });
    }

    const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, '_');
    const key = `${colid}/student-photos/${Date.now()}-${cleanName}`;
    const s3 = new AWS.S3({
      accessKeyId: config.username,
      secretAccessKey: config.password,
      region: config.region
    });

    await s3.putObject({
      Bucket: config.bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }).promise();

    res.json({
      filename: cleanName,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bucket: config.bucket,
      region: config.region,
      key,
      url: s3Url(config.bucket, config.region, key)
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ msg: 'colid is required' });
    const data = await User.find(colidFilter(colid)).sort({ name: 1, regno: 1 }).lean();
    res.json(data.map(serialize));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const payload = buildPayload(req.body);
    if (!payload.colid) return res.status(400).json({ msg: 'colid is required' });
    if (!payload.email) return res.status(400).json({ msg: 'Email is required' });
    const data = await User.create(payload);
    res.json(serialize(data));
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const payload = buildPayload(req.body);
    if (!payload.colid) return res.status(400).json({ msg: 'colid is required' });
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });
    if (!payload.email) return res.status(400).json({ msg: 'Email is required' });

    const duplicate = await User.findOne({ _id: { $ne: req.body.id }, email: payload.email });
    if (duplicate) return res.status(400).json({ msg: 'Duplicate email is not allowed' });

    const data = await User.findOneAndUpdate(
      { _id: req.body.id, ...colidFilter(payload.colid) },
      payload,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ msg: 'Student not found' });
    res.json(serialize(data));
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ msg: 'colid is required' });
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });
    const data = await User.findOneAndDelete({ _id: req.body.id, ...colidFilter(colid) });
    if (!data) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkStudents = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!colid) return res.status(400).json({ msg: 'colid is required' });
    if (!items.length) return res.status(400).json({ msg: 'No rows received' });

    const errors = [];
    let saved = 0;

    for (let index = 0; index < items.length; index += 1) {
      const rowNumber = items[index].rowNumber || index + 2;
      const payload = buildPayload({
        ...items[index],
        colid,
        user: req.body.user || items[index].user,
        institution: req.body.institution || items[index].institution
      });
      if (!payload.email) {
        errors.push({ rowNumber, msg: 'Email is required' });
        continue;
      }

      try {
        await User.findOneAndUpdate(
          { email: payload.email },
          payload,
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }

    res.json({ saved, errors });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.fields = fields;
