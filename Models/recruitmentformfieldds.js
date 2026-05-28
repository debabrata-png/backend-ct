const mongoose = require('mongoose');

const RecruitmentFormFieldSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  formid: { type: String, required: true, index: true },
  fieldname: { type: String, required: true },
  label: { type: String, required: true },
  fieldtype: { type: String, default: 'Text' },
  options: { type: [String], default: [] },
  isrequired: { type: String, default: 'No' },
  page: { type: String, default: 'Page 1' },
  section: { type: String, default: 'Additional details' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

RecruitmentFormFieldSchema.index({ colid: 1, formid: 1, fieldname: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentformfieldds', RecruitmentFormFieldSchema);
