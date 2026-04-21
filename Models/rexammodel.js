const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    colid: Number,
    student: String,
    regno: String,
    totalmarks: Number,

    zscore: Number,
    normalized: Number,
    percentile: Number,

    grade: String,
    gradepoint: Number
}, { timestamps: true });

module.exports = mongoose.model('rexammodel', schema);