const nodemailer = require('nodemailer');
const AdmissionApplication = require('../Models/admissionapplicationdynamic');
const AdmissionFormField = require('../Models/admissionformfield');
const EmailConfiguration = require('../Models/emailconfigurationds');

const baseFields = [
  'formid',
  'academicyear',
  'name',
  'username',
  'email',
  'phone',
  'regno',
  'address',
  'pin',
  'country_form',
  'state_form',
  'district_form',
  'result_status_12th',
  'board_12th',
  'marks_type_12th',
  'marks_12',
  'cgpa_12',
  'result_status_10th',
  'board_10th',
  'marks_type_10th',
  'marks_10',
  'cgpa_10',
  'University_UG',
  'result_status_UG',
  'marks_type_UG',
  'marks_UG',
  'cgpa_UG',
  'University_PG',
  'result_status_PG',
  'marks_type_PG',
  'marks_PG',
  'cgpa_PG',
  'gender',
  'category',
  'ews',
  'ph',
  'minority',
  'tenthmarks',
  'twelvemarks',
  'externaltheorymarks',
  'englishmarks',
  'dateofbirth',
  'dateofapplication',
  'age',
  'twelvesubjects',
  'programtype',
  'programapplied',
  'programcode',
  'applicationstatus',
  'validationstatus',
  'validationcomments',
  'applicationfeeamount',
  'paymentstatus',
  'paymentrefno',
  'paidamount',
  'paiddate',
  'provisionalfeeamount',
  'provisionalpaymentstatus',
  'provisionalpaymentrefno',
  'provisionalpaidamount',
  'provisionalpaiddate',
  'user',
  'createdAt',
  'updatedAt'
];

const labels = {
  formid: 'Form ID',
  academicyear: 'Academic Year',
  name: 'Name',
  username: 'Username',
  email: 'Email',
  phone: 'Phone',
  regno: 'Reg No',
  country_form: 'Country',
  state_form: 'State',
  district_form: 'District',
  programtype: 'Program Type',
  programapplied: 'Program',
  programcode: 'Program Code',
  applicationstatus: 'Application Status',
  validationstatus: 'Validation Status',
  paymentstatus: 'Application Fee Status',
  provisionalpaymentstatus: 'Provisional Fee Status'
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const clean = (value) => String(value ?? '').trim();
const escapeRegex = (value) => clean(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const safeHtml = (value) => clean(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const customFieldId = (fieldname) => `extraFields.${fieldname}`;
const fieldLabel = (field) => labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const getNestedValue = (row, field) => {
  if (field.startsWith('extraFields.')) return row.extraFields?.[field.replace('extraFields.', '')];
  return row[field];
};

const addFilter = (query, filter) => {
  if (!filter?.field) return;
  const value = filter.value;
  if (value === undefined || value === null || (Array.isArray(value) && !value.length) || (!Array.isArray(value) && clean(value) === '')) return;
  if (Array.isArray(value)) {
    const values = value.map(clean).filter(Boolean);
    if (values.length) query[filter.field] = { $in: values };
    return;
  }
  query[filter.field] = { $regex: escapeRegex(value), $options: 'i' };
};

const getSmtpHost = (config = {}) => {
  if (config.smtp) return config.smtp;
  if (config.smptp) return config.smptp;
  if (/gmail/i.test(config.provider || '')) return 'smtp.gmail.com';
  return '';
};

const createTransporter = (config) => {
  const port = Number(config.port) || (/gmail/i.test(config.provider || '') ? 465 : 587);
  const secureValue = String(config.secure || '').toLowerCase();
  return nodemailer.createTransport({
    host: getSmtpHost(config),
    port,
    secure: secureValue === 'yes' || secureValue === 'true' || port === 465,
    auth: {
      user: config.username,
      pass: config.password
    }
  });
};

const loadDefaultGmailConfig = async (colid) => {
  const base = { colid, provider: /^gmail$/i, isactive: /^Yes$/i };
  const defaultConfig = await EmailConfiguration.findOne({ ...base, default: /^Yes$/i }).sort({ updatedAt: -1, createdAt: -1 }).lean();
  if (defaultConfig) return defaultConfig;
  return EmailConfiguration.findOne(base).sort({ updatedAt: -1, createdAt: -1 }).lean();
};

exports.getOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const customFields = await AdmissionFormField.find({ colid, isactive: /^Yes$/i })
      .select('fieldname label formid page section order')
      .sort({ formid: 1, order: 1, createdAt: 1 })
      .lean();
    const observedApplications = await AdmissionApplication.find({ colid }).select('extraFields').lean();
    const observedExtraKeys = Array.from(new Set(
      observedApplications.flatMap((item) => {
        if (!item.extraFields || typeof item.extraFields !== 'object' || Array.isArray(item.extraFields)) return [];
        return Object.keys(item.extraFields);
      })
    )).sort();

    const customMap = new Map();
    customFields.forEach((field) => {
      if (!field.fieldname) return;
      customMap.set(field.fieldname, {
        field: customFieldId(field.fieldname),
        label: field.label || field.fieldname,
        source: 'custom',
        formid: field.formid || '',
        page: field.page || '',
        section: field.section || ''
      });
    });
    observedExtraKeys.forEach((fieldname) => {
      if (!fieldname || customMap.has(fieldname)) return;
      customMap.set(fieldname, {
        field: customFieldId(fieldname),
        label: fieldname,
        source: 'custom',
        formid: '',
        page: '',
        section: ''
      });
    });

    const fields = [
      ...baseFields.map((field) => ({ field, label: fieldLabel(field), source: 'base' })),
      ...Array.from(customMap.values())
    ];

    const options = {};
    await Promise.all(fields.map(async ({ field }) => {
      if (field === 'password' || field === 'validationcomments') return;
      const values = await AdmissionApplication.distinct(field, { colid });
      options[field] = values.map(clean).filter(Boolean).sort((a, b) => a.localeCompare(b));
    }));

    res.json({ fields, options });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.searchApplications = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const query = { colid };
    (Array.isArray(req.body.filters) ? req.body.filters : []).forEach((filter) => addFilter(query, filter));
    const data = await AdmissionApplication.find(query).sort({ createdAt: -1 }).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkDeleteApplications = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const ids = Array.isArray(req.body.ids) ? req.body.ids.filter(Boolean) : [];
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!ids.length) return res.status(400).json({ msg: 'Select at least one application' });
    const result = await AdmissionApplication.deleteMany({ colid, _id: { $in: ids } });
    res.json({ msg: 'Deleted', deleted: result.deletedCount || 0 });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const ids = Array.isArray(req.body.ids) ? req.body.ids.filter(Boolean) : [];
    const subject = clean(req.body.subject || 'Message from institution');
    const message = clean(req.body.message);
    const includeCredentials = Boolean(req.body.includeCredentials);
    const institution = clean(req.body.institution) || 'Institution';
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!ids.length) return res.status(400).json({ msg: 'Select at least one recipient' });
    if (!message) return res.status(400).json({ msg: 'Message is required' });

    const applications = await AdmissionApplication.find({ colid, _id: { $in: ids } })
      .select('name email username password')
      .lean();
    const recipients = applications.filter((item) => /\S+@\S+\.\S+/.test(item.email || ''));
    if (!recipients.length) return res.status(400).json({ msg: 'No selected application has a valid email' });

    const config = await loadDefaultGmailConfig(colid);
    if (!config?.username || !config?.password || !getSmtpHost(config)) {
      return res.status(400).json({ msg: 'Default active Gmail configuration is missing or incomplete' });
    }

    const transporter = createTransporter(config);
    const errors = [];
    let sent = 0;

    for (const recipient of recipients) {
      const credentialText = includeCredentials
        ? `\n\nUsername: ${recipient.username || recipient.email || ''}\nPassword: ${recipient.password || ''}`
        : '';
      const body = `${message}${credentialText}`;
      const html = body.split('\n').map((line) => `<p>${safeHtml(line) || '&nbsp;'}</p>`).join('');
      try {
        await transporter.sendMail({
          from: `"${institution}" <${config.username}>`,
          to: recipient.email,
          subject,
          text: body,
          html: `<div>${html}</div>`
        });
        sent += 1;
      } catch (err) {
        errors.push({ email: recipient.email, name: recipient.name, msg: err.message });
      }
    }

    res.json({ msg: `Email sent to ${sent} recipient${sent === 1 ? '' : 's'}`, sent, failed: errors.length, errors });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
