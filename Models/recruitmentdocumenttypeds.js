const mongoose = require('mongoose');

const RecruitmentDocumentTypeSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  formid: { type: String, required: true, index: true },
  documenttype: { type: String, required: true },
  description: { type: String, default: '' },
  isrequired: { type: String, default: 'No' }
}, { timestamps: true });

RecruitmentDocumentTypeSchema.index({ colid: 1, formid: 1, documenttype: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentdocumenttypeds', RecruitmentDocumentTypeSchema);
