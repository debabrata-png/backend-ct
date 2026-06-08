const mongoose = require("mongoose");

const conductExamModerationAuditSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  moderatorid: { type: mongoose.Schema.Types.ObjectId, ref: "conductexammoderatords", index: true },
  questionpaperid: { type: mongoose.Schema.Types.ObjectId, ref: "conductexamquestionpaperds", index: true },
  academicyear: { type: String, trim: true },
  regulation: { type: String, trim: true },
  exam: { type: String, trim: true },
  examcode: { type: String, trim: true },
  program: { type: String, trim: true },
  programcode: { type: String, trim: true },
  course: { type: String, trim: true },
  coursecode: { type: String, trim: true },
  sectionindex: { type: Number, default: 0 },
  questionindex: { type: Number, default: 0 },
  action: { type: String, trim: true },
  rules: { type: String, trim: true },
  oldquestion: { type: String, trim: true },
  oldanswer: { type: String, trim: true },
  newquestion: { type: String, trim: true },
  newanswer: { type: String, trim: true },
  oldco: { type: String, trim: true },
  newco: { type: String, trim: true },
  oldbloomlevels: [{ type: String, trim: true }],
  newbloomlevels: [{ type: String, trim: true }],
  comments: { type: String, trim: true },
  actorname: { type: String, trim: true },
  actoremail: { type: String, trim: true },
  user: { type: String, trim: true }
}, { timestamps: true });

conductExamModerationAuditSchema.index({ colid: 1, moderatorid: 1, questionpaperid: 1, createdAt: -1 });

module.exports = mongoose.model("conductexammoderationauditds", conductExamModerationAuditSchema);
