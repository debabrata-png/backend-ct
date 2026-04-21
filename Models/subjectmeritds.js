const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: [true, 'Please enter subject code'],
        unique: true,
        uppercase: true,
        trim: true
    },
    colid: {
        type: Number,
        required: true
    },
    subjectName: {
        type: String,
        required: [true, 'Please enter subject name'],
        trim: true
    },
    programmeCode: {
        type: String,
        required: [true, 'Please enter programme code'],
        uppercase: true,
        trim: true
    },
    totalSeats: {
        type: Number,
        required: [true, 'Please enter total seats'],
        min: [0, 'Total seats cannot be negative']
    },
    allocatedSeats: {
        type: Number,
        default: 0,
        min: [0, 'Allocated seats cannot be negative']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field for available seats
subjectSchema.virtual('availableSeats').get(function () {
    return this.totalSeats - this.allocatedSeats;
});

// Indexes for faster queries

subjectSchema.index({ programmeCode: 1 });
subjectSchema.index({ isActive: 1 });

const subjectmeritds = mongoose.model('subjectmeritds', subjectSchema);

module.exports = subjectmeritds;
