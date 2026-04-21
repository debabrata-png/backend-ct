const mongoose = require('mongoose');

const discussiontopicschema1 = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    topicname: {type: String, required: true},
    category: {type: String, required: true},
}, {
    timestamps: true
});

const discussiontopicds1 = mongoose.model("discussiontopicds1", discussiontopicschema1);
module.exports = discussiontopicds1;