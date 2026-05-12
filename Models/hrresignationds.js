const mongoose = require("mongoose");

const hrResignationDocumentSchema = new mongoose.Schema({
  documenttype: { type: String },
  description: { type: String },
  originalname: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  bucket: { type: String },
  region: { type: String },
  key: { type: String },
  url: { type: String },
  uploadedat: { type: Date, default: Date.now },
  uploadedby: { type: String }
});

const hrResignationSchema = new mongoose.Schema(
  {
    employeeid: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    department: { type: String },
    admissionyear: { type: String },
    role: { type: String },
    regno: { type: String },
    resignationdate: { type: Date, required: true },
    noticeperiod: { type: Number, default: 0 },
    lastworkingdate: { type: Date },
    status: {
      type: String,
      enum: ["Resigned", "Notice Period", "Absconded", "Completed"],
      default: "Notice Period"
    },
    remarks: { type: String },
    documents: { type: [hrResignationDocumentSchema], default: [] },
    user: { type: String },
    colid: { type: Number, required: true }
  },
  { timestamps: true }
);

const HrResignation = mongoose.model("HrResignation", hrResignationSchema);

module.exports = HrResignation;
