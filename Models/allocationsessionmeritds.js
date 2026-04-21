const mongoose = require('mongoose');

const allocationSessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        required: [true, 'Please enter session name'],
        trim: true
    },
    colid: {
        type: Number,
        required: true
    },
    programmeCode: {
        type: String,
        required: [true, 'Please enter programme code'],
        uppercase: true,
        trim: true
    },
    allocationType: {
        type: String,
        required: [true, 'Please enter allocation type'],
        enum: ['SINGLE_ROUND', 'MULTI_ROUND'],
        default: 'SINGLE_ROUND'
    },
    currentRound: {
        type: Number,
        default: 0,
        min: 0,
        max: 9
    },
    totalRounds: {
        type: Number,
        default: 9
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'RESET'],
        default: 'PENDING'
    },
    startedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    startedBy: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Indexes for faster queries
allocationSessionSchema.index({ programmeCode: 1 });
allocationSessionSchema.index({ status: 1 });
allocationSessionSchema.index({ createdAt: -1 });

const allocationsessionmeritds = mongoose.model('allocationsessionmeritds', allocationSessionSchema);

module.exports = allocationsessionmeritds;
