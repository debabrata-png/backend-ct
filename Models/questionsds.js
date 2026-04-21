const mongoose = require("mongoose");

const questionsdsschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    questionbankcode: {type: String, required: true},
    sectionid: {type: mongoose.Schema.Types.ObjectId, required: true},
    section: {type: String},
    question: {type: String, required: true},
    questiontype: {type: String, required: true},
    marks: {type: Number},
    options: {type: [String]},
    answer: {type: String},
}, {timestamps: true});

const questionsds = mongoose.model("questionsds", questionsdsschema);

module.exports = questionsds;
