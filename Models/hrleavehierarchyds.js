const mongoose = require("mongoose");

const approvalLevelSchema = new mongoose.Schema(
  {
    level: { type: Number, default: 1 },
    approvername: { type: String, trim: true },
    approveremail: { type: String, trim: true },
    approverrole: { type: String, trim: true }
  },
  { _id: false }
);

const hrLeaveHierarchySchema = new mongoose.Schema(
  {
    employeename: { type: String, trim: true },
    employeeemail: { type: String, trim: true, required: true, index: true },
    department: { type: String, trim: true },
    levels: [approvalLevelSchema],
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hrLeaveHierarchySchema.index({ colid: 1, employeeemail: 1 }, { unique: true });

module.exports = mongoose.model("hrleavehierarchyds", hrLeaveHierarchySchema);
