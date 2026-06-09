const mongoose = require("mongoose");

const conductExamRateCardSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, required: true, trim: true },
    exam: { type: String, required: true, trim: true },
    examcode: { type: String, required: true, trim: true },
    regulation: { type: String, trim: true },
    program: { type: String, required: true, trim: true },
    programcode: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    coursecode: { type: String, required: true, trim: true },
    coursemastercode: { type: String, trim: true },
    papersetterrate: { type: Number, default: 0 },
    moderatorrate: { type: Number, default: 0 },
    examinerrate: { type: Number, default: 0 },
    practicalrate: { type: Number, default: 0 },
    status: { type: String, trim: true, default: "Active" },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

conductExamRateCardSchema.index({
  colid: 1,
  academicyear: 1,
  examcode: 1,
  programcode: 1,
  coursecode: 1,
  coursemastercode: 1
}, { unique: true });

module.exports = mongoose.model("conductexamratecardds", conductExamRateCardSchema);
