const mongoose = require('mongoose');

const AdmissionFormDocumentSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  formname: { type: String, required: true, trim: true },
  formid: { type: String, required: true, trim: true },
  documentname: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  required: { type: String, default: 'No', enum: ['Yes', 'No'] },
  allowedfiletypes: { type: String, default: 'pdf,jpg,jpeg,png', trim: true },
  maxfilesize: { type: String, default: '', trim: true },
  displayorder: { type: Number, default: 0 },
  status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] },
  user: { type: String, default: '', trim: true }
}, { timestamps: true });

AdmissionFormDocumentSchema.index({ colid: 1, formid: 1, documentname: 1 }, { unique: true });

module.exports = mongoose.model('admissionformdocument', AdmissionFormDocumentSchema);
