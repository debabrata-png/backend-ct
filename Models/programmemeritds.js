const mongoose = require('mongoose');

const programmeSchema = new mongoose.Schema({
    programmeCode: {
        type: String,
        required: [true, 'Please enter programme code'],
        trim: true
    },
    colid: {
        type: Number,
        required: true
    },
    programmeName: {
        type: String,
        required: [true, 'Please enter programme name'],
        trim: true
    },
    programmeType: {
        type: String,
        required: [true, 'Please enter programme type'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries

programmeSchema.index({ isActive: 1 });

const programmemeritds = mongoose.model('programmemeritds', programmeSchema);

module.exports = programmemeritds;
