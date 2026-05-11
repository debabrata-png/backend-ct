const mongoose = require("mongoose");

const nepLmsFinalMarksSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    semester: { type: String, trim: true, required: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    regulation: { type: String, trim: true },
    course: { type: String, trim: true },
    coursecode: { type: String, trim: true, required: true },
    major: { type: String, trim: true },
    subject: { type: String, trim: true },
    student: { type: String, trim: true },
    regno: { type: String, trim: true, required: true },
    internalmarks: { type: Number, default: 0 },
    externalmarks: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    grade: { type: String, trim: true },
    gradepoint: { type: Number, default: 0 },
    passstatus: { type: String, enum: ["Pass", "Fail"], default: "Fail" },
    attempt: { type: Number, default: 1 },
    failmode: { type: String, trim: true },
    grademode: { type: String, trim: true },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

nepLmsFinalMarksSchema.index({
  colid: 1,
  academicyear: 1,
  semester: 1,
  coursecode: 1,
  regno: 1
}, { unique: true });

module.exports = mongoose.model("neplmsfinalmarksds", nepLmsFinalMarksSchema);
