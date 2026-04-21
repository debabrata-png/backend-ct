const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: true,
        min: 1,
        max: 9
    },
    subjectCode: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

const studentSchema = new mongoose.Schema({
    enrollmentNumber: {
        type: String,
        required: [true, 'Please enter enrollment number'],
        unique: true,
        uppercase: true,
        trim: true
    },
    colid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please enter student name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        lowercase: true,
        trim: true
    },
    programmeCode: {
        type: String,
        required: [true, 'Please enter programme code'],
        uppercase: true,
        trim: true
    },
    division: {
        type: String,
        required: [true, 'Please enter division'],
        trim: true
    },
    rollNo: {
        type: Number,
        required: [true, 'Please enter roll number']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please enter mobile number'],
        trim: true
    },
    cgpa: {
        type: Number,
        required: [true, 'Please enter CGPA'],
        min: [0, 'CGPA cannot be negative'],
        max: [10, 'CGPA cannot exceed 10']
    },
    abcId: {
        type: String,
        trim: true
    },
    formTimestamp: {
        type: Date,
        required: [true, 'Please enter form timestamp']
    },
    preferences: {
        type: [preferenceSchema],
        required: [true, 'Please enter preferences'],
        validate: {
            validator: function (v) {
                return v.length === 9;
            },
            message: 'Exactly 9 preferences are required'
        }
    },
    verificationStatus: {
        type: String,
        enum: ['VERIFIED', 'PENDING', 'REJECTED'],
        default: 'PENDING'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for faster queries and sorting

studentSchema.index({ programmeCode: 1 });
studentSchema.index({ programmeCode: 1, cgpa: -1, formTimestamp: 1 }); // For merit list
studentSchema.index({ email: 1 });

const studentmeritds = mongoose.model('studentmeritds', studentSchema);

module.exports = studentmeritds;
