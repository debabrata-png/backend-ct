const mongoose = require("mongoose");

const conductExamExaminerAllotmentSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  academicyear: { type: String, required: true, trim: true },
  regulation: { type: String, required: true, trim: true },
  exam: { type: String, required: true, trim: true },
  examcode: { type: String, required: true, trim: true },
  program: { type: String, required: true, trim: true },
  programcode: { type: String, required: true, trim: true },
  type: { type: String, trim: true, default: "" },
  subject: { type: String, trim: true, default: "" },
  semester: { type: String, trim: true, default: "" },
  course: { type: String, required: true, trim: true },
  coursecode: { type: String, required: true, trim: true },
  examinername: { type: String, required: true, trim: true },
  examineremail: { type: String, required: true, trim: true },
  student: { type: String, required: true, trim: true },
  regno: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: "" },
  seatno: { type: String, trim: true, default: "" },
  examdate: { type: String, trim: true, default: "" },
  examslot: { type: String, trim: true, default: "" },
  startdate: { type: String, required: true, trim: true },
  enddate: { type: String, required: true, trim: true },
  status: { type: String, trim: true, default: "Allocated" },
  evaluationstatus: { type: String, trim: true, default: "" },
  evaluationdate: { type: String, trim: true, default: "" },
  user: { type: String, trim: true, default: "" }
}, { timestamps: true });

conductExamExaminerAllotmentSchema.index({
  colid: 1,
  academicyear: 1,
  examcode: 1,
  programcode: 1,
  coursecode: 1,
  regno: 1
}, { unique: true });

module.exports = mongoose.model("conductexamexaminerallotmentds", conductExamExaminerAllotmentSchema);
