const mongoose = require("mongoose");

const studentActivitySchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  user: { type: String },
  studentid: { type: String },
  student: { type: String, required: true },
  regno: { type: String },
  email: { type: String },
  phone: { type: String },
  academicyear: { type: String },
  program: { type: String },
  programcode: { type: String },
  semester: { type: String },
  section: { type: String },
  activitytype: { type: String, required: true },
  activitydetails: { type: String, required: true },
  activitydate: { type: String },
  documenturl: { type: String },
  documentname: { type: String },
  documentkey: { type: String },
  status: { type: String, default: "Active" }
}, { timestamps: true });

studentActivitySchema.index({ colid: 1, regno: 1, academicyear: 1 });

module.exports = mongoose.model("studentactivityds", studentActivitySchema);
