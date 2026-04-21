const mongoose = require("mongoose");

const editquestionlogdsschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    questionbankcode: {type: String, required: true},
    section: {type: String},
    prevquestion: {type: String, required: true},
    editedquestion: {type: String, required: true},
    questiontype: {type: String, required: true},
    marks: {type: Number},
    prevoptions: {type: [String]},
    editedoptions: {type: [String]},
    prevanswer: {type: String},
    editedanswer: {type: String},
}, {timestamps: true});

const editquestionlogds = mongoose.model("editquestionlogds", editquestionlogdsschema);

module.exports = editquestionlogds;