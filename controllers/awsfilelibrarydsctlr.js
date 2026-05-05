const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const Awsconfig = require('../Models/awsconfig');
const AwsFileLibrary = require('../Models/awsfilelibraryds');

const upload = multer({ storage: multer.memoryStorage() });

const encodeS3Key = (key) => String(key || '').split('/').map(encodeURIComponent).join('/');

const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === 'us-east-1') return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const getAwsConfig = async (colid, configid) => {
  const filter = { colid: Number(colid) };
  if (configid) filter._id = configid;
  else filter.type = /^aws$/i;
  return Awsconfig.findOne(filter).sort({ default: -1, _id: -1 }).lean();
};

exports.uploadMiddleware = upload.single('file');

exports.getConfigs = async (req, res) => {
  try {
    const data = await Awsconfig.find({ colid: Number(req.query.colid) })
      .select('_id name bucket region type')
      .sort({ name: 1, bucket: 1 })
      .lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.folder) filter.folder = req.query.folder;
    const data = await AwsFileLibrary.find(filter).sort({ createdAt: -1 }).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Select a file to upload' });

    const colid = Number(req.body.colid);
    const config = await getAwsConfig(colid, req.body.awsconfigid);
    if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
      return res.status(400).json({ msg: 'AWS configuration is incomplete' });
    }

    const folder = String(req.body.folder || '').trim().replace(/^\/+|\/+$/g, '');
    const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, '_');
    const key = `${colid}/${folder ? `${folder}/` : ''}${Date.now()}-${cleanName}`;
    const s3 = new AWS.S3({
      accessKeyId: config.username,
      secretAccessKey: config.password,
      region: config.region
    });

    await s3.putObject({
      Bucket: config.bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      // ACL: 'public-read'
    }).promise();

    const url = s3Url(config.bucket, config.region, key);
    const data = await AwsFileLibrary.create({
      colid,
      user: req.body.user || '',
      uploadedby: req.body.user || '',
      awsconfigid: String(config._id),
      configname: config.name || '',
      bucket: config.bucket,
      region: config.region,
      key,
      filename: cleanName,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url,
      folder,
      description: req.body.description || ''
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await AwsFileLibrary.findOne({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!file) return res.status(404).json({ msg: 'File not found' });

    const config = await getAwsConfig(req.body.colid, file.awsconfigid);
    if (config?.username && config?.password && file.bucket && file.key) {
      const s3 = new AWS.S3({
        accessKeyId: config.username,
        secretAccessKey: config.password,
        region: file.region || config.region
      });
      await s3.deleteObject({ Bucket: file.bucket, Key: file.key }).promise().catch(() => {});
    }

    await AwsFileLibrary.findByIdAndDelete(file._id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
