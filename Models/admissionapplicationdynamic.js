const mongoose = require('mongoose');

const SubjectMarksSchema = new mongoose.Schema({
  subject: String,
  marks: Number
}, { _id: false });

const AdmissionDocumentSchema = new mongoose.Schema({
  documenttype: String,
  description: String,
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  bucket: String,
  region: String,
  key: String,
  url: String,
  uploadedAt: Date
}, { _id: false });

const AdmissionApplicationDynamicSchema = new mongoose.Schema({
  colid: Number,
  formid: {
    type: String,
    default: 'default'
  },
  academicyear: String,
  name: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  pin: String,
  country_form: String,
  state_form: String,
  district_form: String,
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
  programtype: String,
  programapplied: String,
  programcode: String,
  applicationstatus: {
    type: String,
    default: 'Applied'
  },
  tenthsubjectmarks: [SubjectMarksSchema],
  twelvesubjectmarks: [SubjectMarksSchema],
  documents: [AdmissionDocumentSchema],
  extraFields: mongoose.Schema.Types.Mixed,
  applicationfeeamount: {
    type: Number,
    default: 0
  },
  paymentstatus: {
    type: String,
    default: 'Not Required'
  },
  paymentrefno: String,
  paidamount: {
    type: Number,
    default: 0
  },
  paiddate: Date,
  paymentdetails: mongoose.Schema.Types.Mixed,
  provisionalfeeamount: {
    type: Number,
    default: 0
  },
  provisionalpaymentstatus: {
    type: String,
    default: 'Not Required'
  },
  provisionalpaymentrefno: String,
  provisionalpaidamount: {
    type: Number,
    default: 0
  },
  provisionalpaiddate: Date,
  provisionalpaymentdetails: mongoose.Schema.Types.Mixed,
  user: String
}, { timestamps: true });

AdmissionApplicationDynamicSchema.index({ colid: 1, email: 1 }, { unique: true, sparse: true });
AdmissionApplicationDynamicSchema.index({ colid: 1, phone: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('admissionapplicationdynamic', AdmissionApplicationDynamicSchema);
