const mongoose = require('mongoose');

const approvalconfigschema = new mongoose.Schema({
    colid: { type: Number, required: true },
    user: { type: String }, // Created by
    name: { type: String }, // Auto or Custom name
    module: { type: String, required: true }, // e.g. "Purchase Order"
    stepNumber: { type: Number, required: true },
    approverEmail: { type: String, required: true },
    label: { type: String },
    active: { type: Boolean, default: true }
});

const approvalconfigds = mongoose.model('approvalconfigds', approvalconfigschema);
module.exports = approvalconfigds;
