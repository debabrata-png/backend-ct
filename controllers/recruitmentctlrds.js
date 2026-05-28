const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const RecruitmentForm = require('../Models/recruitmentformds');
const RecruitmentFormField = require('../Models/recruitmentformfieldds');
const RecruitmentDocumentType = require('../Models/recruitmentdocumenttypeds');
const RecruitmentValidationCriteria = require('../Models/recruitmentvalidationcriteriads');
const RecruitmentJobPost = require('../Models/recruitmentjobpostds');
const RecruitmentApplication = require('../Models/recruitmentapplicationds');
const Awsconfig = require('../Models/awsconfig');
const AiConfiguration = require('../Models/aiconfigurationds');
const EmailConfiguration = require('../Models/emailconfigurationds');

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single('document');

const clean = (value) => String(value || '').trim();
const cleanKey = (value) => clean(value).replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+/g, '_').toLowerCase();
const normalizeOptions = (options) => Array.isArray(options)
  ? options.map((item) => clean(item)).filter(Boolean)
  : clean(options).split(',').map((item) => clean(item)).filter(Boolean);
const numberOrZero = (value) => Number(value || 0);
const encodeS3Key = (key) => String(key || '').split('/').map(encodeURIComponent).join('/');
const s3Url = (bucket, region, key) => region === 'us-east-1'
  ? `https://${bucket}.s3.amazonaws.com/${encodeS3Key(key)}`
  : `https://${bucket}.s3.${region}.amazonaws.com/${encodeS3Key(key)}`;

const getColid = (req) => Number(req.body.colid || req.query.colid || 0);

const getDefaultGeminiConfig = async (colid) => (
  await AiConfiguration.findOne({ colid: Number(colid), type: /^gemini$/i, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
  || await AiConfiguration.findOne({ colid: Number(colid), type: /^gemini$/i, active: /^yes$/i }).sort({ _id: -1 }).lean()
);

const getSmtpHost = (config = {}) => {
  if (config.smtp) return config.smtp;
  if (config.smptp) return config.smptp;
  if (/gmail/i.test(config.provider || '')) return 'smtp.gmail.com';
  return '';
};

const getDefaultEmailConfig = async (colid) => (
  await EmailConfiguration.findOne({ colid: Number(colid), isactive: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
  || await EmailConfiguration.findOne({ colid: Number(colid), isactive: /^yes$/i }).sort({ _id: -1 }).lean()
);

const createEmailTransporter = (config) => {
  const port = Number(config.port) || 587;
  return nodemailer.createTransport({
    host: getSmtpHost(config),
    port,
    secure: ['yes', 'true'].includes(String(config.secure || '').toLowerCase()) || port === 465,
    auth: { user: config.username, pass: config.password }
  });
};

const escapeHtml = (value) => clean(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const sendCandidateStatusEmail = async ({ colid, candidate, subject, body, senderName }) => {
  const config = await getDefaultEmailConfig(colid);
  if (!config?.username || !config?.password || !getSmtpHost(config)) {
    throw new Error('Default active email configuration is missing or incomplete');
  }
  if (!/\S+@\S+\.\S+/.test(candidate.email || '')) throw new Error('Candidate email is missing or invalid');

  const messageText = clean(body);
  const html = messageText
    .split('\n')
    .map((line) => `<p>${escapeHtml(line) || '&nbsp;'}</p>`)
    .join('');

  await createEmailTransporter(config).sendMail({
    from: `"${clean(senderName) || 'Recruitment'}" <${config.username}>`,
    to: candidate.email,
    subject: clean(subject) || 'Recruitment application update',
    text: messageText,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">${html}</div>`
  });
};

const callGeminiJson = async (apikey, prompt) => {
  const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
  let lastError = '';
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
      })
    });
    const data = await response.json();
    if (response.ok) {
      const output = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '{}';
      try { return JSON.parse(output); } catch (err) { return { status: 'Fail', comments: output }; }
    }
    lastError = data.error?.message || `Gemini API request failed for ${model}`;
  }
  throw new Error(lastError || 'Gemini API request failed');
};

const applicationPayload = (body = {}) => ({
  colid: Number(body.colid),
  jobid: clean(body.jobid),
  formid: clean(body.formid),
  applicationno: clean(body.applicationno),
  applicantname: clean(body.applicantname || body.name),
  email: clean(body.email).toLowerCase(),
  phone: clean(body.phone),
  username: clean(body.username || body.email).toLowerCase(),
  password: clean(body.password),
  status: clean(body.status || 'Submitted'),
  customfields: body.customfields || {},
  documents: Array.isArray(body.documents) ? body.documents : [],
  validationstatus: clean(body.validationstatus),
  validationcomments: clean(body.validationcomments),
  mandatoryvalidationstatus: clean(body.mandatoryvalidationstatus),
  mandatoryvalidationcomments: clean(body.mandatoryvalidationcomments)
});

exports.createForm = async (req, res) => {
  try {
    const colid = getColid(req);
    const formid = cleanKey(req.body.formid || req.body.title || `form_${Date.now()}`);
    const data = await RecruitmentForm.findOneAndUpdate(
      { colid, formid },
      { colid, formid, title: clean(req.body.title), description: clean(req.body.description), isactive: clean(req.body.isactive || 'Yes'), user: clean(req.body.user) },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getForms = async (req, res) => {
  try { res.json(await RecruitmentForm.find({ colid: getColid(req) }).sort({ createdAt: -1 }).lean()); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.deleteForm = async (req, res) => {
  try {
    const colid = getColid(req);
    const formid = clean(req.body.formid);
    await RecruitmentForm.deleteOne({ _id: req.body.id, colid });
    if (formid) {
      await RecruitmentFormField.deleteMany({ colid, formid });
      await RecruitmentDocumentType.deleteMany({ colid, formid });
      await RecruitmentValidationCriteria.deleteMany({ colid, formid });
    }
    res.json({ success: true });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.saveField = async (req, res) => {
  try {
    const colid = getColid(req);
    const formid = clean(req.body.formid);
    const fieldname = cleanKey(req.body.fieldname || req.body.label);
    const payload = {
      colid,
      formid,
      fieldname,
      label: clean(req.body.label || fieldname),
      fieldtype: clean(req.body.fieldtype || 'Text'),
      options: normalizeOptions(req.body.options),
      isrequired: clean(req.body.isrequired || 'No'),
      page: clean(req.body.page || 'Page 1'),
      section: clean(req.body.section || 'Additional details'),
      order: numberOrZero(req.body.order)
    };
    const data = req.body.id
      ? await RecruitmentFormField.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true, runValidators: true })
      : await RecruitmentFormField.findOneAndUpdate({ colid, formid, fieldname }, payload, { upsert: true, new: true, runValidators: true });
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getFields = async (req, res) => {
  try { res.json(await RecruitmentFormField.find({ colid: getColid(req), formid: clean(req.query.formid) }).sort({ order: 1, createdAt: 1 }).lean()); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.deleteField = async (req, res) => {
  try { await RecruitmentFormField.deleteOne({ _id: req.body.id, colid: getColid(req) }); res.json({ success: true }); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.saveDocumentType = async (req, res) => {
  try {
    const colid = getColid(req);
    const payload = {
      colid,
      formid: clean(req.body.formid),
      documenttype: clean(req.body.documenttype),
      description: clean(req.body.description),
      isrequired: clean(req.body.isrequired || 'No')
    };
    const data = req.body.id
      ? await RecruitmentDocumentType.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true, runValidators: true })
      : await RecruitmentDocumentType.findOneAndUpdate({ colid, formid: payload.formid, documenttype: payload.documenttype }, payload, { upsert: true, new: true, runValidators: true });
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getDocumentTypes = async (req, res) => {
  try { res.json(await RecruitmentDocumentType.find({ colid: getColid(req), formid: clean(req.query.formid) }).sort({ documenttype: 1 }).lean()); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.deleteDocumentType = async (req, res) => {
  try { await RecruitmentDocumentType.deleteOne({ _id: req.body.id, colid: getColid(req) }); res.json({ success: true }); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.saveValidationCriteria = async (req, res) => {
  try {
    const colid = getColid(req);
    const formid = clean(req.body.formid);
    const data = await RecruitmentValidationCriteria.findOneAndUpdate(
      { colid, formid },
      { colid, formid, formname: clean(req.body.formname), mandatorycriteria: clean(req.body.mandatorycriteria), validationcriteria: clean(req.body.validationcriteria) },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getValidationCriteria = async (req, res) => {
  try { res.json(await RecruitmentValidationCriteria.findOne({ colid: getColid(req), formid: clean(req.query.formid) }).lean() || {}); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.saveJob = async (req, res) => {
  try {
    const colid = getColid(req);
    const jobid = clean(req.body.jobid || `JOB${Date.now()}`);
    const status = clean(req.body.status || 'Draft');
    const isPosted = /^posted$/i.test(status);
    const existingJob = req.body.id
      ? await RecruitmentJobPost.findOne({ _id: req.body.id, colid }).lean()
      : await RecruitmentJobPost.findOne({ colid, jobid }).lean();
    const currentShareToken = clean(req.body.sharetoken || existingJob?.sharetoken);
    const payload = {
      colid,
      jobid,
      title: clean(req.body.title),
      department: clean(req.body.department),
      location: clean(req.body.location),
      employmenttype: clean(req.body.employmenttype),
      openings: Number(req.body.openings || 1),
      salaryrange: clean(req.body.salaryrange),
      description: clean(req.body.description),
      eligibility: clean(req.body.eligibility),
      skills: clean(req.body.skills),
      formid: clean(req.body.formid),
      status,
      sharetoken: isPosted ? (currentShareToken || `${jobid}_${Date.now()}`) : currentShareToken,
      posteddate: isPosted ? (req.body.posteddate || existingJob?.posteddate || new Date()) : req.body.posteddate,
      lastdate: req.body.lastdate || null,
      user: clean(req.body.user),
      createdByName: clean(req.body.createdByName)
    };
    const data = req.body.id
      ? await RecruitmentJobPost.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true, runValidators: true })
      : await RecruitmentJobPost.findOneAndUpdate({ colid, jobid }, payload, { upsert: true, new: true, runValidators: true });
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getJobs = async (req, res) => {
  try {
    const query = { colid: getColid(req) };
    if (req.query.status) query.status = clean(req.query.status);
    res.json(await RecruitmentJobPost.find(query).sort({ createdAt: -1 }).lean());
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.deleteJob = async (req, res) => {
  try { await RecruitmentJobPost.deleteOne({ _id: req.body.id, colid: getColid(req) }); res.json({ success: true }); }
  catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getPublicJobBundle = async (req, res) => {
  try {
    const colid = getColid(req);
    const job = await RecruitmentJobPost.findOne({ colid, jobid: clean(req.query.jobid), status: 'Posted' }).lean();
    if (!job) return res.status(404).json({ msg: 'Job not found or not posted' });
    if (job.sharetoken && req.query.token && job.sharetoken !== req.query.token) return res.status(403).json({ msg: 'Invalid job link' });
    const [form, fields, documents, criteria] = await Promise.all([
      RecruitmentForm.findOne({ colid, formid: job.formid }).lean(),
      RecruitmentFormField.find({ colid, formid: job.formid }).sort({ order: 1, createdAt: 1 }).lean(),
      RecruitmentDocumentType.find({ colid, formid: job.formid }).sort({ documenttype: 1 }).lean(),
      RecruitmentValidationCriteria.findOne({ colid, formid: job.formid }).lean()
    ]);
    res.json({ job, form, fields, documents, criteria });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Select a file to upload' });
    const colid = getColid(req);
    const documenttype = clean(req.body.documenttype);
    if (!colid || !documenttype) return res.status(400).json({ msg: 'College id and document type are required' });
    if (/photo/i.test(documenttype)) {
      const ext = path.extname(req.file.originalname || '').toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) return res.status(400).json({ msg: 'Photo must be JPG/JPEG/PNG' });
    }
    const config = await Awsconfig.findOne({ colid, type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();
    if (!config?.username || !config?.password || !config?.bucket || !config?.region) return res.status(400).json({ msg: 'Default AWS configuration is missing' });
    const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, '_');
    const key = `${colid}/recruitment/${clean(req.body.jobid) || 'jobs'}/${cleanKey(documenttype)}/${Date.now()}-${cleanName}`;
    const s3 = new AWS.S3({ accessKeyId: config.username, secretAccessKey: config.password, region: config.region });
    await s3.putObject({ Bucket: config.bucket, Key: key, Body: req.file.buffer, ContentType: req.file.mimetype }).promise();
    res.json({
      documenttype,
      description: clean(req.body.description),
      originalname: req.file.originalname,
      filename: cleanName,
      mimetype: req.file.mimetype,
      size: req.file.size,
      key,
      url: s3Url(config.bucket, config.region, key),
      uploadedAt: new Date()
    });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.validateApplication = async (req, res) => {
  try {
    const payload = applicationPayload(req.body);
    const [fields, documents, criteria] = await Promise.all([
      RecruitmentFormField.find({ colid: payload.colid, formid: payload.formid }).lean(),
      RecruitmentDocumentType.find({ colid: payload.colid, formid: payload.formid }).lean(),
      RecruitmentValidationCriteria.findOne({ colid: payload.colid, formid: payload.formid }).lean()
    ]);
    const issues = [];
    if (!payload.applicantname) issues.push('Applicant name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) issues.push('Valid email is required.');
    if (String(payload.phone || '').replace(/\D/g, '').length < 10) issues.push('Valid phone number is required.');
    fields.filter((f) => /^yes$/i.test(f.isrequired)).forEach((field) => {
      if (!clean(payload.customfields?.[field.fieldname])) issues.push(`${field.label || field.fieldname} is required.`);
    });
    documents.filter((d) => /^yes$/i.test(d.isrequired)).forEach((doc) => {
      const found = payload.documents.some((item) => clean(item.documenttype).toLowerCase() === clean(doc.documenttype).toLowerCase() && item.url);
      if (!found) issues.push(`${doc.documenttype} document is required.`);
    });

    const aiConfig = await getDefaultGeminiConfig(payload.colid);
    if (!aiConfig?.apikey) {
      const comments = [
        issues.length ? `Mandatory validation failed:\n${issues.map((item) => `- ${item}`).join('\n')}` : 'Mandatory validation passed.',
        criteria?.mandatorycriteria ? `Mandatory criteria not evaluated by AI because Gemini configuration is missing:\n${criteria.mandatorycriteria}` : '',
        criteria?.validationcriteria ? `Optional criteria not evaluated by AI because Gemini configuration is missing:\n${criteria.validationcriteria}` : ''
      ].filter(Boolean).join('\n\n');
      return res.json({ validationstatus: issues.length ? 'Fail' : 'Pass', mandatoryFailed: issues.length > 0 || !!criteria?.mandatorycriteria, validationcomments: comments, criteriaissues: issues });
    }

    const prompt = `
Validate this recruitment application. Return ONLY JSON:
{
 "validationstatus":"Pass/Fail",
 "mandatorycriteriaresult":"Pass/Fail",
 "validationcomments":"short summary",
 "criteriaissues":[{"criteriaType":"Mandatory/Optional","tab":"","field":"","status":"Pass/Fail","comment":""}]
}
Mandatory criteria:
${criteria?.mandatorycriteria || 'None'}
Optional criteria:
${criteria?.validationcriteria || 'None'}
System mandatory issues already detected:
${issues.map((item) => `- ${item}`).join('\n') || '- None'}
Application:
${JSON.stringify(payload, null, 2)}
Documents:
${JSON.stringify(payload.documents.map((doc) => ({ documenttype: doc.documenttype, url: doc.url, description: doc.description })), null, 2)}
If any system mandatory issue or mandatory criterion fails, mandatorycriteriaresult must be Fail.`;
    const ai = await callGeminiJson(aiConfig.apikey, prompt);
    const mandatoryFailed = issues.length > 0 || /^fail$/i.test(clean(ai.mandatorycriteriaresult)) || (ai.criteriaissues || []).some((item) => /mandatory/i.test(clean(item.criteriaType)) && /^fail$/i.test(clean(item.status)));
    const comments = [
      issues.length ? `System mandatory issues:\n${issues.map((item) => `- ${item}`).join('\n')}` : 'System mandatory checks passed.',
      ai.validationcomments || JSON.stringify(ai)
    ].join('\n\n');
    res.json({ validationstatus: mandatoryFailed ? 'Fail' : clean(ai.validationstatus || 'Pass'), mandatoryFailed, validationcomments: comments, criteriaissues: ai.criteriaissues || [], ai });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.submitApplication = async (req, res) => {
  try {
    const payload = applicationPayload(req.body);
    if (!payload.colid || !payload.jobid || !payload.formid) return res.status(400).json({ msg: 'Job, form and college id are required' });
    if (!payload.email || !payload.phone) return res.status(400).json({ msg: 'Email and phone are required' });
    const existing = await RecruitmentApplication.findOne({ colid: payload.colid, jobid: payload.jobid, $or: [{ email: payload.email }, { phone: payload.phone }] });
    if (existing && clean(req.body.mode) !== 'update') return res.status(400).json({ msg: 'Application already exists for this email or phone' });
    if (!payload.applicationno) payload.applicationno = `REC-${payload.jobid}-${Date.now()}`;
    const data = existing
      ? await RecruitmentApplication.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
      : await RecruitmentApplication.create(payload);
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.retrieveApplication = async (req, res) => {
  try {
    const colid = getColid(req);
    const query = { colid };
    if (req.body.applicationno) query.applicationno = clean(req.body.applicationno);
    else if (req.body.email && req.body.phone) Object.assign(query, { email: clean(req.body.email).toLowerCase(), phone: clean(req.body.phone) });
    else return res.status(400).json({ msg: 'Enter application number or email and phone' });
    const data = await RecruitmentApplication.findOne(query).lean();
    if (!data) return res.status(404).json({ msg: 'Application not found' });
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getApplications = async (req, res) => {
  try {
    const query = { colid: getColid(req) };
    if (req.query.jobid) query.jobid = clean(req.query.jobid);
    if (req.query.status) query.status = clean(req.query.status);
    res.json(await RecruitmentApplication.find(query).sort({ submittedat: -1 }).lean());
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const colid = getColid(req);
    const status = clean(req.body.status);
    const data = await RecruitmentApplication.findOneAndUpdate(
      { _id: req.body.id, colid: getColid(req) },
      { status, shortlistcomments: clean(req.body.shortlistcomments) },
      { new: true }
    );

    if (!data) return res.status(404).json({ msg: 'Candidate not found' });

    let mailSent = false;
    if (/^confirmed$/i.test(status) && clean(req.body.emailbody)) {
      await sendCandidateStatusEmail({
        colid,
        candidate: data,
        subject: clean(req.body.emailsubject) || 'Recruitment confirmation',
        body: req.body.emailbody,
        senderName: clean(req.body.senderName || req.body.name || 'Recruitment')
      });
      mailSent = true;
    }

    res.json({ ...data.toObject(), mailSent });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.shortlistWithAi = async (req, res) => {
  try {
    const colid = getColid(req);
    const jobid = clean(req.body.jobid);
    const instruction = clean(req.body.instruction);
    const applications = await RecruitmentApplication.find({ colid, jobid }).lean();
    const aiConfig = await getDefaultGeminiConfig(colid);
    if (!aiConfig?.apikey) return res.status(400).json({ msg: 'Active/default Gemini configuration is missing' });
    const prompt = `
You are shortlisting recruitment candidates. Return ONLY JSON:
{"selected":[{"applicationno":"","reason":""}],"rejected":[{"applicationno":"","reason":""}]}
Instruction in English:
${instruction}
Candidates:
${JSON.stringify(applications.map((app) => ({
  applicationno: app.applicationno,
  applicantname: app.applicantname,
  email: app.email,
  phone: app.phone,
  customfields: app.customfields,
  validationstatus: app.validationstatus,
  validationcomments: app.validationcomments
})), null, 2)}`;
    const ai = await callGeminiJson(aiConfig.apikey, prompt);
    const selected = Array.isArray(ai.selected) ? ai.selected : [];
    for (const item of selected) {
      await RecruitmentApplication.updateOne(
        { colid, jobid, applicationno: item.applicationno },
        { status: 'Shortlisted', shortlistcomments: item.reason || instruction }
      );
    }
    res.json({ success: true, ai, selectedCount: selected.length });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};
