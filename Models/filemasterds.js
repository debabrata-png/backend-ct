const mongoose = require('mongoose');

const fileschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    file: { type: String },
    description: { type: String },
    link: { type: String },
    department: { type: String },
    filetype: { type: String }
}, {
    timestamps: true
});

const filemasterds = mongoose.model('filemasterds', fileschema);

module.exports = filemasterds;