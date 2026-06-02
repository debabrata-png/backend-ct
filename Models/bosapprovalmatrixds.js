const mongoose = require("mongoose");

const bosApprovalMatrixSchema = new mongoose.Schema(
  {
    cycleid: { type: mongoose.Schema.Types.ObjectId, ref: "boscycleds" },
    cycletitle: { type: String, trim: true, default: "" },
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true, required: true },
    level: { type: Number, required: true },
    approverrole: { type: String, trim: true, default: "" },
    approvername: { type: String, trim: true, default: "" },
    approveremail: { type: String, trim: true, required: true },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

bosApprovalMatrixSchema.index({ colid: 1, cycleid: 1, academicyear: 1, programcode: 1, level: 1 });

module.exports = mongoose.model("bosapprovalmatrixds", bosApprovalMatrixSchema);
