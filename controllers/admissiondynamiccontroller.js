const AdmissionFormField = require('./../Models/admissionformfield');
const AdmissionApplication = require('./../Models/admissionapplicationdynamic');
const AdmissionDynamicForm = require('./../Models/admissiondynamicform');
const EmailConfiguration = require('./../Models/emailconfigurationds');
const MPrograms = require('./../Models/mprograms');
const nodemailer = require('nodemailer');

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

const ensureDefaultForm = async (colid) => {
  let form = await AdmissionDynamicForm.findOne({ colid, formid: 'default' });
  if (!form) {
    form = await AdmissionDynamicForm.create({
      colid,
      formid: 'default',
      title: 'Default Admission Form',
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

    const data = await MPrograms.find(filter).sort({ program: 1, programcode: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProgramTypes = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (req.query.year) filter.year = req.query.year;

    const types = await MPrograms.distinct('type', filter);
    res.json(types.filter(Boolean).sort());
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
  photolink: body.photolink,
  programtype: body.programtype,
  programapplied: body.programapplied,
  programcode: body.programcode,
  applicationstatus: body.applicationstatus || 'Applied',
  tenthsubjectmarks: body.tenthsubjectmarks || [],
  twelvesubjectmarks: body.twelvesubjectmarks || [],
  extraFields: body.extraFields || {},
  user: body.user || ''
});

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
    const data = await AdmissionApplication.findOne({
      _id: req.query.id,
      colid: Number(req.query.colid)
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
