const mongoose = require("mongoose");

const questionsectiondsschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    questionbankcode: {type: String, required: true},
    section: {type: String, required: true},
    sectiontitle: {type: String, required: true},
    description: {type: String},
    totalquestions: {type: Number, required: true},
    questiontype: {type: String, required: true},
    noofquestionsneedtoattend: {type: Number, required: true},
    markspersquestion: {type: Number, required: true},
    totalmarks: {type: Number, required: true},
}, {timestamps: true});

const questionsectionds = mongoose.model("questionsectionds", questionsectiondsschema);

module.exports = questionsectionds;