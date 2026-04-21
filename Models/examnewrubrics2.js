const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    colid: {
        type: Number,
        required: [true, 'Please enter colid'],
        index: true
    },

    student: {
        type: String
    },

    name: {
        type: String
    },

    user: {
        type: String
    },

    regno: {
        type: String
    },

    program: {
        type: String
    },

    programcode: {
        type: String
    },

    course: {
        type: String
    },

    coursecode: {
        type: String
    },

    semester: {
        type: String
    },

    examcode: {
        type: String
    },

    type: {
        type: String
    },

    level: {
        type: String
    },

    credits: {
        type: Number,
        default: 0
    },

    midtermscore: {
        type: Number,
        default: 0
    },

    modifiemidtermscore: {
        type: Number,
        default: 0
    },

    assignmentmarks: {
        type: Number,
        default: 0
    },

    presentationmarks: {
        type: Number,
        default: 0
    },

    testmarks: {
        type: Number,
        default: 0
    },

    attendancemarks: {
        type: Number,
        default: 0
    },

    ciamarks: {
        type: Number,
        default: 0
    },

    totalmarks: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

/**
 * 🔹 Auto-calculate fields before saving
 */
examSchema.pre('save', function(next) {
    // Modified Mid Term = 2/3 of Mid Term
    this.modifiemidtermscore = (this.midtetmscore * 2) / 3;
    

    // CIA Marks = sum of internal components
    this.ciamarks =
        (this.assignmentmarks || 0) +
        (this.presentationmarks || 0) +
        (this.testmarks || 0) +
        (this.attendancemarks || 0);

    // Total Marks = Modified Mid Term + CIA
    this.totalmarks = this.modifiedmidtermscore + this.ciamarks;

    next();
});

examSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();

    if (update.midtermscore !== undefined) {
        update.modifiedmidtermscore = (update.midtermscore * 2) / 3;
    }

    const assignment = update.assignmentmarks || 0;
    const presentation = update.presentationmarks || 0;
    const test = update.testmarks || 0;
    const attendance = update.attendancemarks || 0;

    update.ciamarks = assignment + presentation + test + attendance;

    update.totalmarks =
        (update.modifiedmidtermscore || 0) + update.ciamarks;

    this.setUpdate(update);

    next();
});

module.exports = mongoose.model('examnewrubrics2', examSchema);