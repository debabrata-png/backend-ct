const mongoose = require("mongoose");

const conductExamStationarySchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, required: true, trim: true },
    regulation: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    programcode: { type: String, trim: true },
    coursetype: { type: String, enum: ["Theory", "Practical"], required: true },
    category: { type: String, required: true, trim: true },
    item: { type: String, required: true, trim: true },
    noofunits: { type: Number, default: 0 },
    unittype: { type: String, enum: ["no", "ltr", "mm", "cm", "m", "gallons"], required: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

conductExamStationarySchema.index({
  colid: 1,
  academicyear: 1,
  regulation: 1,
  programcode: 1,
  coursetype: 1,
  category: 1,
  item: 1,
  unittype: 1
}, { unique: true });

module.exports = mongoose.model("conductexamstationaryds", conductExamStationarySchema);
