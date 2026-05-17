const mongoose = require("mongoose");

const courseOutcomeSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    subject: { type: String, trim: true, required: true },
    semester: { type: String, trim: true, required: true },
    course: { type: String, trim: true, required: true },
    coursecode: { type: String, trim: true, required: true },
    modules: [{ type: String, trim: true }],
    topics: [{ type: String, trim: true }],
    bloomlevels: [{ type: String, trim: true }],
    conumber: { type: String, trim: true },
    co: { type: String, trim: true, required: true },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

courseOutcomeSchema.index({
  colid: 1,
  academicyear: 1,
  regulation: 1,
  programcode: 1,
  coursecode: 1,
  conumber: 1
});

module.exports = mongoose.model("courseoutcomeds", courseOutcomeSchema);
