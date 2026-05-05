const mongoose = require('mongoose');

const AdmissionFormFieldSchema = new mongoose.Schema({
  colid: Number,
  formid: {
    type: String,
    default: 'default'
  },
  fieldname: String,
  label: String,
  page: {
    type: String,
    default: 'Page 1'
  },
  section: {
    type: String,
    default: 'Additional Details'
  },
  type: {
    type: String,
    default: 'text'
  },
  options: [String],
  isrequired: {
    type: String,
    default: 'No'
  },
  isactive: {
    type: String,
    default: 'Yes'
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

AdmissionFormFieldSchema.index({ colid: 1, formid: 1, fieldname: 1 }, { unique: true });

module.exports = mongoose.model('admissionformfield', AdmissionFormFieldSchema);
