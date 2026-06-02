const mongoose = require("mongoose");

const bosProgramReviewSchema = new mongoose.Schema(
  {
    cycleid: { type: mongoose.Schema.Types.ObjectId, ref: "boscycleds", required: true },
    cycletitle: { type: String, trim: true, default: "" },
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true, required: true },
    totalrequiredsubjects: { type: Number, default: 0 },
    currentstructure: { type: String, default: "" },
    suggestedstructure: { type: String, default: "" },
    inclusions: { type: String, default: "" },
    deletions: { type: String, default: "" },
    semesterwisecourses: { type: String, default: "" },
    status: { type: String, trim: true, default: "Draft" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

bosProgramReviewSchema.index({ colid: 1, cycleid: 1, academicyear: 1, programcode: 1 });

module.exports = mongoose.model("bosprogramreviewds", bosProgramReviewSchema);
