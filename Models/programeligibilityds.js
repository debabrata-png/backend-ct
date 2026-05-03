const mongoose = require("mongoose");

const programEligibilitySchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    programcode: { type: String, required: true, trim: true },
    program: { type: String, trim: true },
    requiredsubjects: [{ type: String, trim: true }],
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

programEligibilitySchema.index({ colid: 1, programcode: 1 }, { unique: true });

module.exports = mongoose.model("programeligibilityds", programEligibilitySchema);
