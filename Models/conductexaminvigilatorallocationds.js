const mongoose = require("mongoose");

const conductExamInvigilatorAllocationSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  academicyear: { type: String, required: true, trim: true },
  regulation: { type: String, trim: true, default: "" },
  exam: { type: String, required: true, trim: true },
  examcode: { type: String, required: true, trim: true },
  campus: { type: String, required: true, trim: true },
  building: { type: String, required: true, trim: true },
  room: { type: String, required: true, trim: true },
  invigilator: { type: String, required: true, trim: true },
  invigilatoremail: { type: String, required: true, trim: true },
  examdate: { type: String, required: true, trim: true },
  slot: { type: String, required: true, trim: true },
  attendance: { type: String, enum: ["", "Present", "Absent"], default: "" },
  user: { type: String, trim: true, default: "" }
}, { timestamps: true });

conductExamInvigilatorAllocationSchema.index({
  colid: 1,
  academicyear: 1,
  examcode: 1,
  examdate: 1,
  slot: 1,
  campus: 1,
  building: 1,
  room: 1
});

module.exports = mongoose.model("conductexaminvigilatorallocationds", conductExamInvigilatorAllocationSchema);
