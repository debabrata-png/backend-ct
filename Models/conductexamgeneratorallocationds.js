const mongoose = require("mongoose");

const conductExamGeneratorAllocationSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, required: true, trim: true },
    exam: { type: String, trim: true },
    examcode: { type: String, required: true, trim: true },
    examdate: { type: String, required: true, trim: true },
    examslot: { type: String, required: true, trim: true },
    campus: { type: String, required: true, trim: true },
    building: { type: String, required: true, trim: true },
    roomcount: { type: Number, default: 0 },
    studentcount: { type: Number, default: 0 },
    requiredcapacity: { type: Number, default: 0 },
    requiredfuel: { type: Number, default: 0 },
    requiredgenerators: { type: Number, default: 0 },
    generatorcode: { type: String, required: true, trim: true },
    makemodel: { type: String, trim: true },
    suppliername: { type: String, trim: true },
    generatortype: { type: String, trim: true },
    generatorcapacity: { type: Number, default: 0 },
    allocationmode: { type: String, trim: true, default: "Auto" },
    status: { type: String, trim: true, default: "Allocated" },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

conductExamGeneratorAllocationSchema.index({
  colid: 1,
  academicyear: 1,
  examcode: 1,
  examdate: 1,
  examslot: 1,
  campus: 1,
  building: 1,
  generatorcode: 1
}, { unique: true });

module.exports = mongoose.model("conductexamgeneratorallocationds", conductExamGeneratorAllocationSchema);
