const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AllocationSession',
        required: [true, 'Please enter session ID']
    },
    colid: {
        type: Number,
        required: true
    },
    enrollmentNumber: {
        type: String,
        required: [true, 'Please enter enrollment number'],
        trim: true
    },
    studentName: {
        type: String,
        required: [true, 'Please enter student name'],
        trim: true
    },
    programmeCode: {
        type: String,
        required: [true, 'Please enter programme code'],
        trim: true
    },
    division: {
        type: String,
        trim: true
    },
    cgpa: {
        type: Number,
        required: [true, 'Please enter CGPA']
    },
    formTimestamp: {
        type: Date,
        required: [true, 'Please enter form timestamp']
    },
    meritRank: {
        type: Number,
        required: [true, 'Please enter merit rank'],
        min: 1
    },
    allocatedSubject: {
        type: String,
        trim: true
    },
    allocatedSubjectName: {
        type: String,
        trim: true
    },
    preferenceRank: {
        type: Number,
        min: 1,
        max: 9
    },
    allocationRound: {
        type: Number,
        min: 1,
        max: 9
    },
    allocationStatus: {
        type: String,
        enum: ['ALLOCATED', 'NOT_ALLOCATED', 'WAITING'],
        default: 'WAITING'
    },
    remarks: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Indexes for faster queries
allocationSchema.index({ sessionId: 1, enrollmentNumber: 1 }, { unique: true });
allocationSchema.index({ sessionId: 1, allocationStatus: 1 });
allocationSchema.index({ sessionId: 1, allocatedSubject: 1 });
allocationSchema.index({ meritRank: 1 });

const allocationmeritds = mongoose.model('allocationmeritds', allocationSchema);

module.exports = allocationmeritds;
