const mongoose = require('mongoose');

const SubjectMarksSchema = new mongoose.Schema({
  subject: String,
  marks: Number
}, { _id: false });

const AdmissionApplicationDynamicSchema = new mongoose.Schema({
  colid: Number,
  academicyear: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  pin: String,
  gender: String,
  category: String,
  ews: String,
  ph: String,
  minority: String,
  tenthmarks: Number,
  twelvemarks: Number,
  externaltheorymarks: Number,
  englishmarks: Number,
  dateofbirth: String,
  dateofapplication: String,
  age: Number,
  twelvesubjects: String,
  photolink: String,
  programtype: String,
  programapplied: String,
  programcode: String,
  applicationstatus: {
    type: String,
    default: 'Applied'
  },
  tenthsubjectmarks: [SubjectMarksSchema],
  twelvesubjectmarks: [SubjectMarksSchema],
  extraFields: mongoose.Schema.Types.Mixed,
  user: String
}, { timestamps: true });

AdmissionApplicationDynamicSchema.index({ colid: 1, email: 1 }, { unique: true, sparse: true });
AdmissionApplicationDynamicSchema.index({ colid: 1, phone: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('admissionapplicationdynamic', AdmissionApplicationDynamicSchema);
