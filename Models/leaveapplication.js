const mongoose = require("mongoose");

const leaveappschema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    reason: { type: String },
    leavetype: { type: String },
    from: { type: Date },
    to: { type: Date },
    currentLevel: { type: Number, enum: [1, 2], default: 1 },
    approvals: [{
        level: { type: Number },
        approvername: { type: String },
        approveremail: { type: String },
        action: { type: String, enum: ['Approved', 'Rejected'] },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    leavestatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    colid: { type: Number }
});

const Leave = mongoose.model("Leave", leaveappschema);
module.exports = Leave;