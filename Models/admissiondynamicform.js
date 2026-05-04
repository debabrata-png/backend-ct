const mongoose = require('mongoose');

const AdmissionDynamicFormSchema = new mongoose.Schema({
  colid: Number,
  formid: String,
  title: String,
  description: String,
  isactive: {
    type: String,
    default: 'Yes'
  },
  user: String
}, { timestamps: true });

AdmissionDynamicFormSchema.index({ colid: 1, formid: 1 }, { unique: true });

module.exports = mongoose.model('admissiondynamicform', AdmissionDynamicFormSchema);
