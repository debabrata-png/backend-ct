const mongoose = require('mongoose');

const comunicationdsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    refno: { type: String },
    comtype: { type: String },
    comdate: { type: Date },
    department: { type: String },
    purpose: { type: String },
    link: { type: String },
    vendor: { type: String },
    year: { type: String }
}, {
    timestamps: true
})

const comunicationds = mongoose.model('comunicationds', comunicationdsschema)

module.exports = comunicationds;
