const mongoose = require("mongoose");

const ResearchApprovalMatrixSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  level: { type: Number, required: true },
  role: { type: String, required: true },
  status: { type: String, default: "Active" },
  name: String,
  user: String
}, { timestamps: true });

ResearchApprovalMatrixSchema.index({ colid: 1, level: 1 });

module.exports = mongoose.model("researchapprovalmatrixds", ResearchApprovalMatrixSchema);
