const mongoose = require('mongoose');

const subjectgroupschema = new mongoose.Schema({
    name: { type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    subject: {type: String, required: true},
    groupname: {type: String, required: true},
    year: {type: String },
    programcode: {type: String },
    semester: {type: String },
    type: {type: String },
    createdAt: { type: Date, default: Date.now }
})

const subjectgroupds = mongoose.model('subjectgroupds', subjectgroupschema);

module.exports = subjectgroupds;