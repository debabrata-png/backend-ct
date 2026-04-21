const mongoose = require('mongoose');

const allocationAuditLogSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AllocationSession',
        required: [true, 'Please enter session ID']
    },
    colid: {
        type: Number,
        required: true
    },
    round: {
        type: Number,
        required: [true, 'Please enter round number'],
        min: 1,
    },
    enrollmentNumber: {
        type: String,
        required: [true, 'Please enter enrollment number'],
        uppercase: true,
        trim: true
    },
    studentName: {
        type: String,
        required: [true, 'Please enter student name'],
        trim: true
    },
    action: {
        type: String,
        required: [true, 'Please enter action'],
        enum: ['ALLOCATED', 'SKIPPED_NO_SEATS', 'SKIPPED_PREFERENCE_NOT_AVAILABLE', 'NOT_ALLOCATED']
    },
    subjectCode: {
        type: String,
        uppercase: true,
        trim: true
    },
    preferenceRank: {
        type: Number,
        min: 1,
        max: 9
    },
    details: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Indexes for faster queries
allocationAuditLogSchema.index({ sessionId: 1, round: 1 });
allocationAuditLogSchema.index({ sessionId: 1, enrollmentNumber: 1 });
allocationAuditLogSchema.index({ createdAt: -1 });

const allocationauditlogmeritds = mongoose.model('allocationauditlogmeritds', allocationAuditLogSchema);

module.exports = allocationauditlogmeritds;
