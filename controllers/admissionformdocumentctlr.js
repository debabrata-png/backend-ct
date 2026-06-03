const AdmissionFormDocument = require('../Models/admissionformdocument');

const text = (value) => String(value || '').trim();
const toNumber = (value) => {
  if (value === '' || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const cleanYesNo = (value, fallback = 'No') => {
  const normalized = text(value).toLowerCase();
  if (normalized === 'yes' || normalized === 'y' || normalized === 'true' || normalized === '1') return 'Yes';
  if (normalized === 'no' || normalized === 'n' || normalized === 'false' || normalized === '0') return 'No';
  return fallback;
};

const cleanStatus = (value) => {
  const normalized = text(value).toLowerCase();
  if (normalized === 'inactive' || normalized === 'not active' || normalized === '0') return 'Inactive';
  return 'Active';
};

const payload = (input = {}) => ({
  colid: toNumber(input.colid),
  formname: text(input.formname),
  formid: text(input.formid),
  documentname: text(input.documentname || input.document || input.name),
  description: text(input.description),
  required: cleanYesNo(input.required, 'No'),
  allowedfiletypes: text(input.allowedfiletypes || input.allowedFileTypes) || 'pdf,jpg,jpeg,png',
  maxfilesize: text(input.maxfilesize || input.maxFileSize),
  displayorder: toNumber(input.displayorder || input.displayOrder) || 0,
  status: cleanStatus(input.status),
  user: text(input.user)
});

const validate = (item) => {
  if (item.colid === undefined) return 'colid is required';
  if (!item.formname) return 'Form name is required';
  if (!item.formid) return 'Form ID is required';
  if (!item.documentname) return 'Document name is required';
  return '';
};

const filterFrom = (source = {}) => {
  const filter = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) filter.colid = colid;
  ['formid', 'formname', 'documentname', 'required', 'status'].forEach((field) => {
    if (text(source[field])) filter[field] = field === 'documentname' || field === 'formname'
      ? new RegExp(text(source[field]), 'i')
      : text(source[field]);
  });
  return filter;
};

exports.getDocuments = async (req, res) => {
  try {
    const filter = filterFrom(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: 'colid is required' });
    const data = await AdmissionFormDocument.find(filter).sort({ formname: 1, displayorder: 1, documentname: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const item = payload(req.body);
    const error = validate(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await AdmissionFormDocument.create(item);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? 'This document already exists for the selected form' : error.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const item = payload(req.body);
    const error = validate(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await AdmissionFormDocument.findByIdAndUpdate(req.body.id, item, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: 'Document not found' });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? 'This document already exists for the selected form' : error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const data = await AdmissionFormDocument.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: 'Document not found' });
    res.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkDocuments = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!items.length) return res.status(400).json({ success: false, message: 'No rows received' });
    const errors = [];
    const valid = [];
    items.forEach((row, index) => {
      const item = payload({ ...row, colid: req.body.colid || row.colid, user: req.body.user || row.user });
      const error = validate(item);
      if (error) errors.push({ rowNumber: row.rowNumber || index + 2, message: error });
      else valid.push(item);
    });
    if (valid.length) {
      await AdmissionFormDocument.bulkWrite(valid.map((item) => ({
        updateOne: {
          filter: { colid: item.colid, formid: item.formid, documentname: item.documentname },
          update: { $set: item },
          upsert: true
        }
      })));
    }
    res.json({ success: true, inserted: valid.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
