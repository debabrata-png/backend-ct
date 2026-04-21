const mongoose = require("mongoose");

const questionbankdsschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    course: {type: String, required: true},
    coursecode: {type: String, required: true},
    year: {type: String},
    semester: {type: String},
    examcode: {type: String},
    faculty: {type: String, required: true},
    moderator: {type: String, required: true},
    questionbankcode: {type: String, required: true},
    isfinalized: {type: Boolean, default: false},
    finalizedby: {type: String},
    finalizedat: {type: Date},
}, {timestamps: true});

const questionbankds = mongoose.model("questionbankds", questionbankdsschema);

module.exports = questionbankds;
