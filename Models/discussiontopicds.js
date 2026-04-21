const mongoose = require('mongoose');

const discussiontopicschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    topicname: {type: String, required: true},
    description: {type: String, required: true},
    programcode: {type: String},
    coursecode: {type: String},
    year: {type: String},
    semester: {type: String},
}, {
    timestamps: true
});

const discussiontopicds = mongoose.model("discussiontopicds", discussiontopicschema);
module.exports = discussiontopicds;