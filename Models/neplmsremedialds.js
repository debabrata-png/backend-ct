const mongoose = require("mongoose");

const nepLmsRemedialSchema = new mongoose.Schema(
  {
    assessmentid: { type: String, trim: true, index: true },
    assessmenttitle: { type: String, trim: true },
    questionid: { type: String, trim: true },
    question: { type: String, trim: true },
    academicyear: { type: String, trim: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    course: { type: String, trim: true },
    coursecode: { type: String, trim: true },
    topic: { type: String, trim: true },
    student: { type: String, trim: true },
    regno: { type: String, trim: true, index: true },
    contenttype: { type: String, trim: true, default: "Video" },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    link: { type: String, trim: true },
    provider: { type: String, trim: true },
    marks: { type: Number, default: 0 },
    maxmarks: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

nepLmsRemedialSchema.index({ colid: 1, academicyear: 1, programcode: 1, coursecode: 1, regno: 1 });

module.exports = mongoose.model("neplmsremedialds", nepLmsRemedialSchema);
