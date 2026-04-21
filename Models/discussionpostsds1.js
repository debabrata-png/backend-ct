const mongoose = require('mongoose');

const discussionpostsschema1 = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    topicid: {type: mongoose.Schema.Types.ObjectId, ref: 'discussiontopicds1', required: true},
    postdescription: {type: String, required: true},
}, {
    timestamps: true
});

const discussionpostsds1 = mongoose.model("discussionpostsds1", discussionpostsschema1);
module.exports = discussionpostsds1;