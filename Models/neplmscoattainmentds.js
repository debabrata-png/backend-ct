const mongoose = require("mongoose");

const levelCriterionSchema = new mongoose.Schema(
  {
    level: { type: String, trim: true },
    fromvalue: { type: Number, default: 0 },
    tovalue: { type: Number, default: 0 }
  },
  { _id: false }
);

const nepLmsCoAttainmentSchema = new mongoose.Schema(
  {
    assessmentid: { type: mongoose.Schema.Types.ObjectId, ref: "neplmsdescriptiveassessmentds", required: true },
    assessmenttitle: { type: String, trim: true },
    academicyear: { type: String, trim: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    course: { type: String, trim: true },
    coursecode: { type: String, trim: true },
    semester: { type: String, trim: true },
    co: { type: String, trim: true },
    conumber: { type: String, trim: true },
    level: { type: String, trim: true },
    threshold: { type: Number, default: 0 },
    attainmentpercentage: { type: Number, default: 0 },
    studentsabove: { type: Number, default: 0 },
    totalstudents: { type: Number, default: 0 },
    levelcriteria: [levelCriterionSchema],
    facultyname: { type: String, trim: true },
    facultyemail: { type: String, trim: true },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

nepLmsCoAttainmentSchema.index({ colid: 1, assessmentid: 1, conumber: 1 });
nepLmsCoAttainmentSchema.index({ colid: 1, academicyear: 1, programcode: 1, coursecode: 1, semester: 1 });

module.exports = mongoose.model("neplmscoattainmentds", nepLmsCoAttainmentSchema);
