const mongoose = require('mongoose');

const alumniDocumentsSchema = new mongoose.Schema({
    colid: { type: Number, required: true },
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    documentName: { type: String, required: true },
    documentType: { type: String },
    description: { type: String },
    fileUrl: { type: String, required: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('alumnidocumentsds', alumniDocumentsSchema);
