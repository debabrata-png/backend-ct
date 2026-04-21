const mongoose = require('mongoose');

const bellExamSchema = new mongoose.Schema({
    colid: Number,
    student: String,
    regno: String,
    totalmarks: Number,

    zscore: Number,
    normalized: Number,
    grade: String,
    gradepoint: Number

}, { timestamps: true });

module.exports = mongoose.model('bellexammodel1', bellExamSchema);