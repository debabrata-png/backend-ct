const mongoose = require("mongoose");

const nepLmsComponentMarksSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    semester: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true },
    course: { type: String, trim: true },
    coursecode: { type: String, trim: true, required: true },
    major: { type: String, trim: true },
    subject: { type: String, trim: true },
    student: { type: String, trim: true },
    regno: { type: String, trim: true, required: true },
    assessmentgroup: { type: String, trim: true, required: true },
    grouptype: { type: String, trim: true },
    scoretype: { type: String, trim: true },
    marks: { type: Number, default: 0 },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

nepLmsComponentMarksSchema.index({
  colid: 1,
  academicyear: 1,
  semester: 1,
  coursecode: 1,
  regno: 1,
  assessmentgroup: 1,
  scoretype: 1
}, { unique: true });

module.exports = mongoose.model("neplmscomponentmarksds", nepLmsComponentMarksSchema);
