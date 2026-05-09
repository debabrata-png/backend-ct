const mongoose = require("mongoose");

const nepLmsAssessmentMarksSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    type: { type: String, trim: true },
    subject: { type: String, trim: true },
    semester: { type: String, trim: true, required: true },
    course: { type: String, trim: true },
    coursecode: { type: String, trim: true, required: true },
    assessmentcomponent: { type: String, trim: true, required: true },
    assessmentgroup: { type: String, trim: true },
    grouptype: { type: String, trim: true },
    scoretype: { type: String, trim: true },
    totalmarks: { type: Number, default: 0 },
    weightage: { type: Number, default: 0 },
    marksobtained: { type: Number, default: 0 },
    effectivemarks: { type: Number, default: 0 },
    student: { type: String, trim: true },
    regno: { type: String, trim: true, required: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    faculty: { type: String, trim: true },
    facultyemail: { type: String, trim: true },
    status: { type: String, trim: true, default: "Added" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

nepLmsAssessmentMarksSchema.index({
  colid: 1,
  academicyear: 1,
  semester: 1,
  coursecode: 1,
  assessmentcomponent: 1,
  assessmentgroup: 1,
  regno: 1
}, { unique: true });

module.exports = mongoose.model("neplmsassessmentmarksds", nepLmsAssessmentMarksSchema);
