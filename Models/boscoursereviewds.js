const mongoose = require("mongoose");

const bosCourseReviewSchema = new mongoose.Schema(
  {
    cycleid: { type: mongoose.Schema.Types.ObjectId, ref: "boscycleds", required: true },
    cycletitle: { type: String, trim: true, default: "" },
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true, required: true },
    type: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "" },
    semester: { type: String, trim: true, required: true },
    course: { type: String, trim: true, required: true },
    coursecode: { type: String, trim: true, required: true },
    oldsyllabus: { type: String, default: "" },
    newsyllabus: { type: String, default: "" },
    assessmentscheme: { type: String, default: "" },
    geminisuggestion: { type: String, default: "" },
    geminireview: { type: String, default: "" },
    matchpercent: { type: Number, default: 0 },
    newpercent: { type: Number, default: 0 },
    facultymessage: { type: String, default: "" },
    facultyname: { type: String, trim: true, default: "" },
    facultyemail: { type: String, trim: true, default: "" },
    approvallevel: { type: Number, default: 1 },
    status: { type: String, trim: true, default: "Applied" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

bosCourseReviewSchema.index({ colid: 1, cycleid: 1, academicyear: 1, programcode: 1, semester: 1, coursecode: 1, status: 1 });

module.exports = mongoose.model("boscoursereviewds", bosCourseReviewSchema);
