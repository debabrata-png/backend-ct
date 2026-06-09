const mongoose = require("mongoose");

const conductExamScoreRuleSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, required: true, trim: true },
    exam: { type: String, required: true, trim: true },
    examcode: { type: String, required: true, trim: true },
    regulation: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    programcode: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    coursecode: { type: String, required: true, trim: true },
    paperid: { type: mongoose.Schema.Types.ObjectId, ref: "conductexamquestionpaperds", required: true, index: true },
    sectionid: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    questionsconsider: { type: Number, default: 1 },
    status: { type: String, trim: true, default: "Active" },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

conductExamScoreRuleSchema.index({ colid: 1, paperid: 1, sectionid: 1 }, { unique: true });

module.exports = mongoose.model("conductexamscoreruleds", conductExamScoreRuleSchema);
