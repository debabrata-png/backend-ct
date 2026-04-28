const mongoose = require("mongoose");

const meritListSchema = new mongoose.Schema(
  {
    student: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    category: { type: String, trim: true },
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, trim: true, default: "2026-27" },
    programname: { type: String, trim: true },
    subjects: { type: String, trim: true },
    externaltheorymarks: { type: Number },
    sscaggregatemarks: { type: Number },
    tenthmarks: { type: Number },
    englishmarks: { type: Number },
    age: { type: Number },
    bridgecourserequired: { type: String, trim: true, default: "No" },
    status: { type: String, trim: true, default: "Applied" }
  },
  { timestamps: true }
);

meritListSchema.index({ colid: 1, student: 1 });
meritListSchema.index({ colid: 1, programname: 1 });
meritListSchema.index({ colid: 1, status: 1 });

module.exports = mongoose.model("meritlist", meritListSchema);
