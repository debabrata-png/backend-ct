const mongoose = require("mongoose");

const regulationMasterSchema = new mongoose.Schema(
  {
    regulation: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    isactive: { type: String, enum: ["Yes", "No"], default: "Yes" },
    colid: { type: Number, required: true, index: true }
  },
  { timestamps: true }
);

regulationMasterSchema.index({ colid: 1, regulation: 1 });

module.exports = mongoose.model("regulationmasterds", regulationMasterSchema);
