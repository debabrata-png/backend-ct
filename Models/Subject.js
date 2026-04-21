const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String }, // e.g., person who added this subject
    user: { type: String }, // e.g., email/username of the creator
    colid: { type: Number, required: true }, // college ID
    subjectName: { type: String, required: true }, // e.g., "HEG"
    fullName: { type: String }, // e.g., "History, Economics, Geography"
    programName: { type: String, required: true } // e.g., "B.A." or "B.Sc."
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);