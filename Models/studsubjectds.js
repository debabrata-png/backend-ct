const mongoose = require('mongoose');

const studsubjectschema = new mongoose.Schema({
    name: { type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    subject: {type: String, required: true},
    groupname: {type: String, required: true},
    year: {type: String },
    programcode: {type: String },
    semester: {type: String },
    type: {type: String },
    student: {type: String, required: true},
    regno: {type: String, required: true},
    status: {type: String, default: 'Pending'},
    createdAt: { type: Date, default: Date.now }
});

const studsubjectds = mongoose.model('studsubjectds', studsubjectschema);

module.exports = studsubjectds;