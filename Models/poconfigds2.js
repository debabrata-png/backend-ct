const mongoose = require('mongoose');

const poconfigschema = new mongoose.Schema({
    colid: { type: String, required: true },
    user: { type: String, required: true },
    notes: { type: String }, // HTML or Text
    terms: { type: String }, // HTML or Text
    status: { type: String, default: 'Active' }
}, {
    timestamps: true
});

const poconfigds2 = mongoose.model('poconfigds2', poconfigschema);
module.exports = poconfigds2;
