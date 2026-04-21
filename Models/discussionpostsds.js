const mongoose = require('mongoose');

const discussionpostsschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    topicid: {type: mongoose.Schema.Types.ObjectId, ref: 'discussiontopicds', required: true},
    postdescription: {type: String, required: true},
    programcode: {type: String},
    coursecode: {type: String},
    year: {type: String},
    semester: {type: String},
}, {
    timestamps: true
});

const discussionpostsds = mongoose.model("discussionpostsds", discussionpostsschema);
module.exports = discussionpostsds;