const mongoose = require("mongoose");

const visitingFacultyClassSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  facultyid: { type: mongoose.Schema.Types.ObjectId, ref: "visitingfacultyds", required: true },
  facultyname: { type: String, required: true, trim: true },
  department: { type: String, trim: true },
  classdate: { type: String, required: true, trim: true },
  numberofclasses: { type: Number, required: true, min: 0 },
  user: { type: String, trim: true }
}, { timestamps: true });

visitingFacultyClassSchema.index({ colid: 1, facultyid: 1, classdate: 1 }, { unique: true });

module.exports = mongoose.model("visitingfacultyclassds", visitingFacultyClassSchema);
