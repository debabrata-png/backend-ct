const mongoose = require('mongoose');

const AdmissionValidationCriteriaSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  formname: { type: String, required: true, trim: true },
  formid: { type: String, required: true, trim: true },
  validationcriteria: { type: String, default: '' },
  user: String
}, { timestamps: true });

AdmissionValidationCriteriaSchema.index({ colid: 1, formid: 1 }, { unique: true });

module.exports = mongoose.model('admissionvalidationcriteria', AdmissionValidationCriteriaSchema);
