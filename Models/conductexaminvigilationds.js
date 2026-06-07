const mongoose = require("mongoose");

const conductExamInvigilationSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  academicyear: { type: String, trim: true, required: true },
  regulation: { type: String, trim: true, required: true },
  exam: { type: String, trim: true, required: true },
  examcode: { type: String, trim: true, required: true },
  invigilatorname: { type: String, trim: true, required: true },
  invigilatoremail: { type: String, trim: true, required: true },
  invigilatorcourse: { type: String, trim: true, default: "" },
  invigilatorcoursecode: { type: String, trim: true, default: "" },
  amountpersession: { type: Number, default: 0 },
  user: { type: String, trim: true, default: "" }
}, { timestamps: true });

conductExamInvigilationSchema.index({
  colid: 1,
  academicyear: 1,
  regulation: 1,
  examcode: 1,
  invigilatoremail: 1
});

module.exports = mongoose.model("conductexaminvigilationds", conductExamInvigilationSchema);
