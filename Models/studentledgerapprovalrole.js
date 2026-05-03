const mongoose = require("mongoose");

const studentLedgerApprovalRoleSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    role: { type: String, required: true, trim: true },
    level: { type: Number, required: true },
    isactive: { type: String, default: "Yes" },
    user: { type: String, trim: true },
    remarks: { type: String, trim: true }
  },
  { timestamps: true }
);

studentLedgerApprovalRoleSchema.index({ colid: 1, level: 1, role: 1 });

module.exports = mongoose.model("studentledgerapprovalrole", studentLedgerApprovalRoleSchema);
