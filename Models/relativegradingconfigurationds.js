const mongoose = require("mongoose");

const relativeGradingConfigurationSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true, required: true },
    course: { type: String, trim: true, required: true },
    coursecode: { type: String, trim: true, required: true },
    from: { type: Number, default: 0 },
    to: { type: Number, default: 0 },
    grade: { type: String, trim: true, required: true },
    gradepoint: { type: Number, default: 0 },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

relativeGradingConfigurationSchema.index({
  colid: 1,
  academicyear: 1,
  regulation: 1,
  programcode: 1,
  coursecode: 1,
  grade: 1
});

module.exports = mongoose.model("relativegradingconfigurationds", relativeGradingConfigurationSchema);
