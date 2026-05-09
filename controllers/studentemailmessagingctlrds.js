const nodemailer = require('nodemailer');
const User = require('../Models/user');
const EmailConfiguration = require('../Models/emailconfigurationds');

const allowedFilterFields = [
  'program',
  'programcode',
  'academicyear',
  'admissionyear',
  'name',
  'email',
  'phone',
  'regno',
  'semester',
  'section',
  'regulation',
  'Major',
  'Minor',
  'AEC',
  'SEC',
  'VAC',
  'IDC',
  'gender',
  'category'
];

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const escapeRegex = (value) => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildStudentQuery = (body = {}) => {
  const colid = toNumber(body.colid);
  const query = {
    colid,
    role: { $regex: '^Student$', $options: 'i' }
  };

  (body.filters || []).forEach((filter) => {
    if (!filter || !allowedFilterFields.includes(filter.field)) return;
    const value = filter.value;
    if (Array.isArray(value)) {
      const values = value.map((item) => String(item || '').trim()).filter(Boolean);
      if (values.length) query[filter.field] = { $in: values };
      return;
    }
    if (value === undefined || value === null || String(value).trim() === '') return;
    query[filter.field] = { $regex: escapeRegex(value), $options: 'i' };
  });

  return { colid, query };
};

exports.getStudentFilterOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const baseQuery = {
      colid,
      role: { $regex: '^Student$', $options: 'i' }
    };

    const optionEntries = await Promise.all(
      allowedFilterFields.map(async (field) => {
        const values = await User.distinct(field, baseQuery);
        return [
          field,
          values
            .map((item) => String(item || '').trim())
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))
        ];
      })
    );

    res.json({
      fields: allowedFilterFields,
      options: Object.fromEntries(optionEntries)
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getSmtpHost = (config = {}) => {
  if (config.smtp) return config.smtp;
  if (config.smptp) return config.smptp;
  if (/gmail/i.test(config.provider || '')) return 'smtp.gmail.com';
  return '';
};

const createTransporter = (config) => {
  const port = Number(config.port) || 587;
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

const loadDefaultEmailConfig = async (colid) => {
  const baseQuery = {
    colid,
    isactive: /^Yes$/i
  };

  const defaultConfig = await EmailConfiguration.findOne({
    ...baseQuery,
    default: /^Yes$/i
  }).lean();

  if (defaultConfig) return defaultConfig;

  return EmailConfiguration.findOne(baseQuery).sort({ updatedAt: -1, createdAt: -1 }).lean();
};

exports.searchStudents = async (req, res) => {
  try {
    const { colid, query } = buildStudentQuery(req.body);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const data = await User.find(query)
      .select('name email phone regno program programcode academicyear admissionyear semester section regulation Major Minor AEC SEC VAC IDC gender category colid')
      .sort({ program: 1, semester: 1, section: 1, name: 1 })
      .lean();

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const studentIds = Array.isArray(req.body.studentIds) ? req.body.studentIds : [];
    const message = String(req.body.message || '').trim();
    const subject = String(req.body.subject || 'Message from institution').trim();
    const institution = req.body.institution || 'Institution';

    if (!studentIds.length) return res.status(400).json({ msg: 'Select at least one student' });
    if (!message) return res.status(400).json({ msg: 'Message text is required' });

    const students = await User.find({
      _id: { $in: studentIds },
      colid,
      role: { $regex: '^Student$', $options: 'i' }
    }).select('name email regno').lean();

    const recipients = students.filter((student) => /\S+@\S+\.\S+/.test(student.email || ''));
    if (!recipients.length) return res.status(400).json({ msg: 'No selected student has a valid email address' });

    const config = await loadDefaultEmailConfig(colid);
    if (!config?.username || !config?.password || !getSmtpHost(config)) {
      return res.status(400).json({ msg: 'Default active email configuration is missing or incomplete' });
    }

    const transporter = createTransporter(config);
    const htmlMessage = message
      .split('\n')
      .map((line) => `<p>${line.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])) || '&nbsp;'}</p>`)
      .join('');

    const errors = [];
    let sent = 0;

    for (const student of recipients) {
      try {
        await transporter.sendMail({
          from: `"${institution}" <${config.username}>`,
          to: student.email,
          subject,
          text: message,
          html: `<div>${htmlMessage}</div>`
        });
        sent += 1;
      } catch (err) {
        errors.push({ email: student.email, name: student.name, msg: err.message });
      }
    }

    res.json({
      msg: `Email sent to ${sent} student${sent === 1 ? '' : 's'}`,
      sent,
      failed: errors.length,
      errors
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
