const mongoose = require('mongoose');

const bellExamSchema = new mongoose.Schema({
    name: String,
    colid: Number,
    regno: String,
    student: String,
    totalmarks: Number,

    zscore: Number,
    grade: String,
    gradepoint: Number

}, { timestamps: true });

module.exports = mongoose.model('bellExam', bellExamSchema);