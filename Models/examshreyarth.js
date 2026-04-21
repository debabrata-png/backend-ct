const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    colid: {
        type: Number,
        required: [true, 'Please enter colid'],
        index: true
    },

    student: {
        type: String,
        required: [true, 'Please enter student name']
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
        type: Number
    },

    credits: {
        type: Number,
        default: 0
    },

    midTermScore: {
        type: Number,
        default: 0
    },

    modifiedMidTermScore: {
        type: Number,
        default: 0
    },

    assignmentMarks: {
        type: Number,
        default: 0,
        max: 10
    },

    presentationMarks: {
        type: Number,
        default: 0,
        max: 5
    },

    testMarks: {
        type: Number,
        default: 0,
        max: 10
    },

    attendanceMarks: {
        type: Number,
        default: 0,
        max: 5
    },

    ciaMarks: {
        type: Number,
        default: 0
    },

    totalMarks: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

/**
 * 🔹 Auto-calculate fields before saving
 */
examSchema.pre('save', function(next) {
    // Modified Mid Term = 2/3 of Mid Term
    this.modifiedMidTermScore = (this.midTermScore * 2) / 3;

    // CIA Marks = sum of internal components
    this.ciaMarks =
        (this.assignmentMarks || 0) +
        (this.presentationMarks || 0) +
        (this.testMarks || 0) +
        (this.attendanceMarks || 0);

    // Total Marks = Modified Mid Term + CIA
    this.totalMarks = this.modifiedMidTermScore + this.ciaMarks;

    next();
});

examSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();

    if (update.midTermScore !== undefined) {
        update.modifiedMidTermScore = (update.midTermScore * 2) / 3;
    }

    const assignment = update.assignmentMarks || 0;
    const presentation = update.presentationMarks || 0;
    const test = update.testMarks || 0;
    const attendance = update.attendanceMarks || 0;

    update.ciaMarks = assignment + presentation + test + attendance;

    update.totalMarks =
        (update.modifiedMidTermScore || 0) + update.ciaMarks;

    this.setUpdate(update);

    next();
});

module.exports = mongoose.model('examshreyarth', examSchema);