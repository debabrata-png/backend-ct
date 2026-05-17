const AdmissionFormField = require('./../Models/admissionformfield');
const AdmissionApplication = require('./../Models/admissionapplicationdynamic');
const AdmissionDynamicForm = require('./../Models/admissiondynamicform');
const EmailConfiguration = require('./../Models/emailconfigurationds');
const MPrograms = require('./../Models/mprograms');
const Awsconfig = require('./../Models/awsconfig');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

const upload = multer({ storage: multer.memoryStorage() });

const cleanFieldName = (value) => String(value || '')
  .trim()
  .replace(/[^a-zA-Z0-9_]/g, '_')
  .replace(/_+/g, '_')
  .toLowerCase();

const normalizeOptions = (options) => {
  if (Array.isArray(options)) return options.map((item) => String(item).trim()).filter(Boolean);
  return String(options || '').split(',').map((item) => item.trim()).filter(Boolean);
};

const cleanFormId = (value) => cleanFieldName(value || 'default') || 'default';

const encodeS3Key = (key) => String(key || '').split('/').map(encodeURIComponent).join('/');

const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === 'us-east-1') return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const ensureDefaultForm = async (colid) => {
  let form = await AdmissionDynamicForm.findOne({ colid, formid: 'default' });
  if (!form) {
    form = await AdmissionDynamicForm.create({
      colid,
      formid: 'default',
      title: 'Default Admission Form',
      level: '',
      description: '',
      isactive: 'Yes'
    });
  }
  return form;
};

AdmissionFormField.collection.dropIndex('colid_1_fieldname_1').catch(() => {});

const createAdmissionMailTransport = (config) => {
  const smtpHost = config.smtp || config.smptp;
  if (smtpHost) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: Number(config.port || 587),
      secure: String(config.secure || '').toLowerCase() === 'yes',
      auth: {
        user: config.username,
        pass: config.password
      }
    });
  }

  return nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use true for port 465
    auth: {
      user: config.username,
      pass: config.password
    }
  });
};

const sendAdmissionConfirmationMail = async (application) => {
  try {
    if (!application?.email) return { sent: false, reason: 'Applicant email missing' };

    const mailConfig = await EmailConfiguration.findOne({
      colid: application.colid,
      provider: /^gmail$/i,
      type: /^admission$/i,
      isactive: 'Yes'
    }).lean();

    if (!mailConfig?.username || !mailConfig?.password) {
      return { sent: false, reason: 'Admission Gmail configuration missing' };
    }

    const formDefinition = await AdmissionDynamicForm.findOne({
      colid: application.colid,
      formid: application.formid || 'default'
    }).lean();

    const transporter = createAdmissionMailTransport(mailConfig);
    const subject = `Admission application received - ${application._id}`;
    const text = [
      `Dear ${application.name || 'Applicant'},`,
      '',
      'Thank you for submitting your admission application.',
      `Application ID: ${application._id}`,
      `Academic Year: ${application.academicyear || ''}`,
      `Program: ${application.programapplied || application.programcode || ''}`,
      `Form: ${formDefinition?.title || application.formid || 'Admission Application'}`,
      '',
      'Please keep the application acknowledgement for future reference.',
      '',
      'This is an automated confirmation email.'
    ].join('\n');

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
        <p>Dear ${application.name || 'Applicant'},</p>
        <p>Thank you for submitting your admission application.</p>
        <table style="border-collapse:collapse;margin:12px 0">
          <tr><td style="padding:6px 10px;border:1px solid #d1d5db"><b>Application ID</b></td><td style="padding:6px 10px;border:1px solid #d1d5db">${application._id}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #d1d5db"><b>Academic Year</b></td><td style="padding:6px 10px;border:1px solid #d1d5db">${application.academicyear || ''}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #d1d5db"><b>Program</b></td><td style="padding:6px 10px;border:1px solid #d1d5db">${application.programapplied || application.programcode || ''}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #d1d5db"><b>Form</b></td><td style="padding:6px 10px;border:1px solid #d1d5db">${formDefinition?.title || application.formid || 'Admission Application'}</td></tr>
        </table>
        <p>Please keep the application acknowledgement for future reference.</p>
        <p style="font-size:12px;color:#6b7280">This is an automated confirmation email.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `${formDefinition?.title || 'Admissions'} <${mailConfig.username}>`,
      to: application.email,
      subject,
      text,
      html
    });

    return { sent: true };
  } catch (err) {
    console.error('Admission confirmation mail failed:', err.message);
    return { sent: false, reason: err.message };
  }
};

exports.getForms = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    await ensureDefaultForm(colid);
    const data = await AdmissionDynamicForm.find({
      colid,
      ...(req.query.activeOnly === 'No' ? {} : { isactive: 'Yes' })
    }).sort({ createdAt: -1, title: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getForm = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const formid = cleanFormId(req.query.formid);
    if (formid === 'default') await ensureDefaultForm(colid);
    const data = await AdmissionDynamicForm.findOne({ colid, formid, isactive: 'Yes' });
    if (!data) return res.status(404).json({ msg: 'Admission form not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createForm = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const title = String(req.body.title || '').trim();
    if (!title) return res.status(400).json({ msg: 'Form title is required' });

    const data = await AdmissionDynamicForm.create({
      colid,
      formid: cleanFormId(req.body.formid || title),
      title,
      level: req.body.level || '',
      description: req.body.description || '',
      isactive: req.body.isactive || 'Yes',
      user: req.body.user || ''
    });

    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Form id already exists' });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const data = await AdmissionDynamicForm.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      {
        title: req.body.title,
        level: req.body.level || '',
        description: req.body.description || '',
        isactive: req.body.isactive || 'Yes'
      },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    await AdmissionDynamicForm.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      { isactive: 'No' },
      { new: true }
    );
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPrograms = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.year) filter.year = req.query.year;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.level) filter.level = req.query.level;

    const data = await MPrograms.find(filter).sort({ Order: 1, program: 1, programcode: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProgramTypes = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.year) filter.year = req.query.year;
    if (req.query.level) filter.level = req.query.level;

    const types = await MPrograms.aggregate([
      { $match: { ...filter, type: { $nin: [null, ''] } } },
      {
        $group: {
          _id: '$type',
          minOrder: { $min: { $ifNull: ['$Order', 0] } }
        }
      },
      { $sort: { minOrder: 1, _id: 1 } }
    ]);
    res.json(types.map((item) => item._id).filter(Boolean));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProgramLevels = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.year) filter.year = req.query.year;
    if (req.query.type) filter.type = req.query.type;

    const levels = await MPrograms.distinct('level', filter);
    res.json(levels.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getFields = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const formid = cleanFormId(req.query.formid);
    if (formid === 'default') await ensureDefaultForm(colid);
    const formFilter = formid === 'default'
      ? { $or: [{ formid }, { formid: { $exists: false } }] }
      : { formid };
    const data = await AdmissionFormField.find({
      colid,
      ...formFilter,
      ...(req.query.activeOnly === 'No' ? {} : { isactive: 'Yes' })
    }).sort({ page: 1, section: 1, order: 1, label: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const fieldname = cleanFieldName(req.body.fieldname || req.body.label);
    if (!fieldname || !req.body.label) {
      return res.status(400).json({ msg: 'Field label is required' });
    }

    const data = await AdmissionFormField.create({
      colid: Number(req.body.colid),
      formid: cleanFormId(req.body.formid),
      fieldname,
      label: req.body.label,
      page: req.body.page || 'Page 1',
      section: req.body.section || 'Additional Details',
      type: req.body.type || 'text',
      options: normalizeOptions(req.body.options),
      isrequired: req.body.isrequired || 'No',
      isactive: req.body.isactive || 'Yes',
      order: Number(req.body.order || 0)
    });

    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Field already exists' });
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkCreateFields = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = Number(req.body.colid);
    const formid = cleanFormId(req.body.formid);

    if (!colid) return res.status(400).json({ msg: 'College id is required' });
    if (items.length === 0) return res.status(400).json({ msg: 'No rows received' });

    const errors = [];
    let saved = 0;

    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const rowNumber = item.rowNumber || index + 2;
      const label = String(item.label || item.Label || '').trim();
      const fieldname = cleanFieldName(item.fieldname || item.fieldName || item['Field Key'] || label);

      if (!label || !fieldname) {
        errors.push({ rowNumber, msg: 'Label is required' });
        continue;
      }

      try {
        await AdmissionFormField.findOneAndUpdate(
          { colid, formid, fieldname },
          {
            colid,
            formid,
            fieldname,
            label,
            page: item.page || item.Page || 'Page 1',
            section: item.section || item.Section || 'Additional Details',
            type: item.type || item.Type || 'text',
            options: normalizeOptions(item.options || item.Options),
            isrequired: item.isrequired || item.required || item.Required || 'No',
            isactive: item.isactive || item.active || item.Active || 'Yes',
            order: Number(item.order || item.Order || 0)
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }

    res.json({ saved, errors });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const formid = cleanFormId(req.body.formid);
    const formFilter = formid === 'default'
      ? { $or: [{ formid }, { formid: { $exists: false } }] }
      : { formid };
    const data = await AdmissionFormField.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid), ...formFilter },
      {
        label: req.body.label,
        page: req.body.page || 'Page 1',
        section: req.body.section || 'Additional Details',
        type: req.body.type,
        options: normalizeOptions(req.body.options),
        isrequired: req.body.isrequired,
        isactive: req.body.isactive,
        order: Number(req.body.order || 0)
      },
      { new: true }
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const formid = cleanFormId(req.body.formid);
    const formFilter = formid === 'default'
      ? { $or: [{ formid }, { formid: { $exists: false } }] }
      : { formid };
    await AdmissionFormField.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid), ...formFilter },
      { isactive: 'No' },
      { new: true }
    );
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const applicationPayload = (body) => ({
  colid: Number(body.colid),
  formid: cleanFormId(body.formid),
  academicyear: body.academicyear,
  name: body.name,
  email: String(body.email || '').trim().toLowerCase(),
  phone: String(body.phone || '').trim(),
  address: body.address,
  pin: body.pin,
  gender: body.gender,
  category: body.category,
  ews: body.ews,
  ph: body.ph,
  minority: body.minority,
  tenthmarks: Number(body.tenthmarks || 0),
  twelvemarks: Number(body.twelvemarks || 0),
  externaltheorymarks: Number(body.externaltheorymarks || 0),
  englishmarks: Number(body.englishmarks || 0),
  dateofbirth: body.dateofbirth,
  dateofapplication: body.dateofapplication,
  age: Number(body.age || 0),
  twelvesubjects: body.twelvesubjects,
  programtype: body.programtype,
  programapplied: body.programapplied,
  programcode: body.programcode,
  applicationstatus: body.applicationstatus || 'Applied',
  tenthsubjectmarks: body.tenthsubjectmarks || [],
  twelvesubjectmarks: body.twelvesubjectmarks || [],
  documents: body.documents || [],
  extraFields: body.extraFields || {},
  user: body.user || ''
});

exports.uploadDocumentMiddleware = upload.single('file');

exports.uploadApplicationDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Select a file to upload' });

    const colid = Number(req.body.colid);
    const documenttype = String(req.body.documenttype || '').trim();
    if (!colid) return res.status(400).json({ msg: 'College id is required' });
    if (!documenttype) return res.status(400).json({ msg: 'Document type is required' });
    if (/^photo$/i.test(documenttype)) {
      const extension = path.extname(req.file.originalname || '').toLowerCase();
      const allowedMime = ['image/jpeg', 'image/jpg', 'image/png'].includes(req.file.mimetype);
      const allowedExtension = ['.jpg', '.jpeg', '.png'].includes(extension);
      if (!allowedMime || !allowedExtension) {
        return res.status(400).json({ msg: 'Photo must be a JPG, JPEG, or PNG file' });
      }
    }

    const config = await Awsconfig.findOne({
      colid,
      type: /^aws$/i,
      default: /^yes$/i
    }).lean();

    if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
      return res.status(400).json({ msg: 'Default AWS configuration is missing or incomplete' });
    }

    const formid = cleanFormId(req.body.formid);
    const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, '_');
    const cleanType = cleanFieldName(documenttype) || 'document';
    const key = `${colid}/admission-applications/${formid}/${cleanType}/${Date.now()}-${cleanName}`;

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
      documenttype,
      description: req.body.description || '',
      filename: cleanName,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bucket: config.bucket,
      region: config.region,
      key,
      url: s3Url(config.bucket, config.region, key),
      uploadedAt: new Date()
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const payload = applicationPayload(req.body);
    if (!payload.email || !payload.phone) {
      return res.status(400).json({ msg: 'Email and phone are required' });
    }

    const duplicate = await AdmissionApplication.findOne({
      colid: payload.colid,
      $or: [{ email: payload.email }, { phone: payload.phone }]
    });

    if (duplicate) {
      return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    }

    const data = await AdmissionApplication.create(payload);
    const mailStatus = await sendAdmissionConfirmationMail(data);
    const response = data.toObject();
    response.mailStatus = mailStatus;
    res.json(response);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.saveDraftApplication = async (req, res) => {
  try {
    const payload = applicationPayload({
      ...req.body,
      applicationstatus: 'Draft'
    });
    if (!payload.email || !payload.phone) {
      return res.status(400).json({ msg: 'Email and phone are required before saving the application' });
    }

    const id = String(req.body.id || '').trim();
    const duplicateFilter = {
      colid: payload.colid,
      $or: [{ email: payload.email }, { phone: payload.phone }]
    };
    if (id) duplicateFilter._id = { $ne: id };

    const duplicate = await AdmissionApplication.findOne(duplicateFilter);
    if (duplicate) {
      return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    }

    if (id) {
      const current = await AdmissionApplication.findOne({ _id: id, colid: payload.colid });
      if (!current) return res.status(404).json({ msg: 'Application not found' });
      if (current.applicationstatus !== 'Draft') {
        return res.status(400).json({ msg: 'Submitted application cannot be edited' });
      }
      const data = await AdmissionApplication.findOneAndUpdate(
        { _id: id, colid: payload.colid },
        payload,
        { new: true }
      );
      return res.json(data);
    }

    const data = await AdmissionApplication.create(payload);
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.submitDraftApplication = async (req, res) => {
  try {
    const payload = applicationPayload({
      ...req.body,
      applicationstatus: 'Applied'
    });
    if (!req.body.id) return res.status(400).json({ msg: 'Application id is required' });
    if (!payload.email || !payload.phone) {
      return res.status(400).json({ msg: 'Email and phone are required' });
    }

    const duplicate = await AdmissionApplication.findOne({
      _id: { $ne: req.body.id },
      colid: payload.colid,
      $or: [{ email: payload.email }, { phone: payload.phone }]
    });
    if (duplicate) {
      return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    }

    const current = await AdmissionApplication.findOne({ _id: req.body.id, colid: payload.colid });
    if (!current) return res.status(404).json({ msg: 'Application not found' });
    if (current.applicationstatus !== 'Draft') {
      return res.status(400).json({ msg: 'Only draft applications can be submitted from this page' });
    }

    const data = await AdmissionApplication.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      payload,
      { new: true }
    );
    const mailStatus = await sendAdmissionConfirmationMail(data);
    const response = data.toObject();
    response.mailStatus = mailStatus;
    res.json(response);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkCreateApplications = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (items.length === 0) {
      return res.status(400).json({ msg: 'No rows received' });
    }

    const payloads = items.map((item, index) => ({
      rowNumber: item.rowNumber || index + 2,
      data: applicationPayload({ ...item, colid: req.body.colid || item.colid, formid: req.body.formid || item.formid })
    }));

    const errors = [];
    const valid = [];
    const seenEmails = new Set();
    const seenPhones = new Set();

    payloads.forEach((item) => {
      const payload = item.data;
      if (!payload.email || !payload.phone) {
        errors.push({ rowNumber: item.rowNumber, msg: 'Email and phone are required' });
        return;
      }
      if (seenEmails.has(payload.email)) {
        errors.push({ rowNumber: item.rowNumber, msg: 'Duplicate email in Excel' });
        return;
      }
      if (seenPhones.has(payload.phone)) {
        errors.push({ rowNumber: item.rowNumber, msg: 'Duplicate phone in Excel' });
        return;
      }
      seenEmails.add(payload.email);
      seenPhones.add(payload.phone);
      valid.push({ rowNumber: item.rowNumber, data: payload });
    });

    if (valid.length === 0) {
      return res.json({ inserted: 0, errors });
    }

    const colid = Number(req.body.colid || valid[0].data.colid);
    const existing = await AdmissionApplication.find({
      colid,
      $or: [
        { email: { $in: valid.map((item) => item.data.email) } },
        { phone: { $in: valid.map((item) => item.data.phone) } }
      ]
    }).select('email phone').lean();

    const existingEmails = new Set(existing.map((item) => item.email));
    const existingPhones = new Set(existing.map((item) => item.phone));
    const insertable = [];

    valid.forEach((item) => {
      if (existingEmails.has(item.data.email) || existingPhones.has(item.data.phone)) {
        errors.push({ rowNumber: item.rowNumber, msg: 'Duplicate email or phone already exists' });
      } else {
        insertable.push(item.data);
      }
    });

    if (insertable.length > 0) {
      await AdmissionApplication.insertMany(insertable, { ordered: false });
    }

    res.json({ inserted: insertable.length, errors });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const payload = applicationPayload(req.body);
    const duplicate = await AdmissionApplication.findOne({
      _id: { $ne: req.body.id },
      colid: payload.colid,
      $or: [{ email: payload.email }, { phone: payload.phone }]
    });

    if (duplicate) {
      return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    }

    const data = await AdmissionApplication.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      payload,
      { new: true }
    );

    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email or phone is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const data = await AdmissionApplication.findOneAndDelete({
      _id: req.body.id,
      colid: Number(req.body.colid)
    });

    if (!data) return res.status(404).json({ msg: 'Application not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.formid) filter.formid = cleanFormId(req.query.formid);
    if (req.query.academicyear) filter.academicyear = req.query.academicyear;
    if (req.query.programcode) filter.programcode = req.query.programcode;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.name) filter.name = { $regex: req.query.name, $options: 'i' };
    if (req.query.email) filter.email = { $regex: req.query.email, $options: 'i' };
    if (req.query.phone) filter.phone = { $regex: req.query.phone, $options: 'i' };

    const data = await AdmissionApplication.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getFilterOptions = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.formid) filter.formid = cleanFormId(req.query.formid);
    const data = await AdmissionApplication.find(filter)
      .select('programapplied programcode category')
      .lean();

    const programMap = new Map();
    const categorySet = new Set();

    data.forEach((item) => {
      if (item.programcode) {
        programMap.set(item.programcode, {
          programcode: item.programcode,
          programapplied: item.programapplied || item.programcode
        });
      }
      if (item.category) categorySet.add(item.category);
    });

    res.json({
      programs: Array.from(programMap.values()).sort((a, b) => String(a.programapplied).localeCompare(String(b.programapplied))),
      categories: Array.from(categorySet).sort()
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const id = String(req.query.id || req.query.applicationnumber || '').trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid application number' });
    }
    const data = await AdmissionApplication.findOne({
      _id: id,
      colid: Number(req.query.colid)
    });
    if (!data) return res.status(404).json({ msg: 'Application not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
