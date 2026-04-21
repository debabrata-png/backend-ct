const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    subjectName: { type: String, required: true }, // e.g., "HEG"
    fullName: { type: String }, // e.g., "History, Economics, Geography"
    programName: { type: String, required: true } // e.g., "B.A." or "B.Sc."
});

module.exports = mongoose.model('Subjectann', subjectSchema);