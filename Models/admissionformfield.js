const mongoose = require('mongoose');

const AdmissionFormFieldSchema = new mongoose.Schema({
  colid: Number,
  fieldname: String,
  label: String,
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

AdmissionFormFieldSchema.index({ colid: 1, fieldname: 1 }, { unique: true });

module.exports = mongoose.model('admissionformfield', AdmissionFormFieldSchema);
