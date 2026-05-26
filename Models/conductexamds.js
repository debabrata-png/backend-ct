const mongoose = require("mongoose");

const conductExamSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  academicyear: { type: String, required: true, trim: true },
  examname: { type: String, required: true, trim: true },
  examcode: { type: String, required: true, trim: true },
  session: { type: String, enum: ["Odd", "Even"], required: true },
  type: { type: String, enum: ["Regular", "Supplementary"], required: true },
  user: { type: String, trim: true }
}, { timestamps: true });

conductExamSchema.index({ colid: 1, academicyear: 1, examcode: 1 }, { unique: true });

module.exports = mongoose.model("conductexamds", conductExamSchema);
