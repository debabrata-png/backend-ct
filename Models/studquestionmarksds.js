const mongoose = require('mongoose');

const studquestionmarksdsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    student: {type: String},
    regno: {type: String},
    program: { type: String },
    course: { type: String },
    coursecode: { type: String },
    month: { type: String },
    regulation: { type: String },
    branch: { type: String },
    year: { type: String },
    semester: { type: String },
    examcode: { type: String },
    examiner: { type: String },
    questionbankcode: { type: String },
    section: { type: String },
    question: { type: String },
    maxmark: { type: Number },
    marksobtained: { type: Number },
    type: { type: String  },
    status: { type: String  },
}, { timestamps: true });

module.exports = mongoose.model('studquestionmarksds', studquestionmarksdsSchema);