const mongoose = require('mongoose');

const SchReportCardConfigdsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    schoolname: { type: String },
    addressline1: { type: String },
    addressline2: { type: String },
    affiliationno: { type: String },
    schoolcode: { type: String },
    udisecode: { type: String },
    email: { type: String },
    phone: { type: String },
    telephone: { type: String },
    logolink: { type: String },
    activetemplate: { type: String, default: 'standard' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SchReportCardConfigds', SchReportCardConfigdsSchema);
