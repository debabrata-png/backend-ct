const mongoose = require('mongoose');

const leaveApproverSchema = new mongoose.Schema({
    approvername: { type: String },
    approveremail: { type: String },
    employeename: { type: String },
    employeeemail: { type: String },
    level: { type: Number, enum: [1, 2], required: true },
    colid: {type: Number}
}, { timestamps: true });

// Prevent duplicate assignments
leaveApproverSchema.index({ approveremail: 1,  employeeemail: 1, level: 1 }, { unique: true });
const LeaveApprover = mongoose.model('LeaveApproverds', leaveApproverSchema);

module.exports = LeaveApprover;