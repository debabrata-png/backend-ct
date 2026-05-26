const mongoose = require("mongoose");

const visitingFacultySchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  name: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  panno: { type: String, trim: true },
  profile: { type: String, trim: true },
  photolink: { type: String, trim: true },
  resumelink: { type: String, trim: true },
  documents: [{
    documenttype: { type: String, trim: true },
    description: { type: String, trim: true },
    link: { type: String, trim: true },
    filename: { type: String, trim: true },
    uploadedat: { type: Date, default: Date.now }
  }],
  department: { type: String, trim: true },
  paymode: { type: String, enum: ["hourly", "monthly", "lecturewise"], required: true },
  amount: { type: Number, default: 0 },
  tds: { type: Number, default: 0 },
  user: { type: String, trim: true }
}, { timestamps: true });

visitingFacultySchema.index({ colid: 1, panno: 1 });
visitingFacultySchema.index({ colid: 1, name: 1, department: 1 });

module.exports = mongoose.model("visitingfacultyds", visitingFacultySchema);
