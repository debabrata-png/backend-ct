const mongoose = require("mongoose");

const hrLeaveBalanceSchema = new mongoose.Schema(
  {
    cyclename: { type: String, trim: true },
    employeename: { type: String, trim: true },
    employeeemail: { type: String, trim: true, required: true, index: true },
    department: { type: String, trim: true },
    leavetype: { type: String, trim: true, required: true },
    openingbalance: { type: Number, default: 0 },
    carryforward: { type: Number, default: 0 },
    earned: { type: Number, default: 0 },
    used: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hrLeaveBalanceSchema.index({ colid: 1, cyclename: 1, employeeemail: 1, leavetype: 1 }, { unique: true });

module.exports = mongoose.model("hrleavebalanceds", hrLeaveBalanceSchema);
