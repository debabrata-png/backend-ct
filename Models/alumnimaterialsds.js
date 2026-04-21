const mongoose = require('mongoose');

const alumniMaterialsSchema = new mongoose.Schema({
    colid: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String }, // PDF, PPT
    category: { type: String },
    department: { type: String },
    fileUrl: { type: String, required: true },
    tags: [String],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    downloadCount: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('alumnimaterialsds', alumniMaterialsSchema);
