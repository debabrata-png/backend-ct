const mongoose = require('mongoose');

const alumniJobsSchema = new mongoose.Schema({
    colid: { type: Number, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
    type: { type: String }, // Full-time, Internship
    workMode: { type: String }, // Remote, On-site, Hybrid
    location: { type: String },
    experienceLevel: { type: String },
    applicationLink: { type: String },
    deadline: { type: Date },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    status: { type: Number, default: 1 }, // 1: Active, 0: Closed
    views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('alumnijobsds', alumniJobsSchema);
