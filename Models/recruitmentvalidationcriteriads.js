const mongoose = require('mongoose');

const RecruitmentValidationCriteriaSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  formid: { type: String, required: true, index: true },
  formname: { type: String, default: '' },
  mandatorycriteria: { type: String, default: '' },
  validationcriteria: { type: String, default: '' }
}, { timestamps: true });

RecruitmentValidationCriteriaSchema.index({ colid: 1, formid: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentvalidationcriteriads', RecruitmentValidationCriteriaSchema);
