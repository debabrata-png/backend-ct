const mongoose = require("mongoose");

const academicSubjectSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    stream: { type: String, trim: true, required: true },
    type: { type: String, trim: true, enum: ["Grant-in", "Non Grant"], default: "Grant-in" },
    program: { type: String, trim: true, required: true },
    semester: { type: String, trim: true, required: true },
    subjects: { type: String, trim: true, required: true },
    status: { type: String, trim: true, enum: ["Active", "Inactive"], default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

academicSubjectSchema.index({
  colid: 1,
  academicyear: 1,
  stream: 1,
  type: 1,
  program: 1,
  semester: 1,
  subjects: 1
});

module.exports = mongoose.model("academicsubjectds", academicSubjectSchema);
