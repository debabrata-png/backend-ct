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

const hrEmployeeAttendanceApprovalMatrixSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "Employee Attendance Approval" },
    department: { type: String, trim: true },
    levels: [approvalLevelSchema],
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("hremployeeattendanceapprovalmatrixds", hrEmployeeAttendanceApprovalMatrixSchema);
