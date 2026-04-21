const mongoose = require('mongoose');

const alumniEventsSchema = new mongoose.Schema({
    colid: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String }, // Webinar, Workshop, Reunion
    date: { type: Date, required: true },
    time: { type: String },
    venue: { type: String },
    mode: { type: String }, // Online, Offline
    meetingLink: { type: String },
    image: { type: String }, // Banner URL
    maxParticipants: { type: Number },
    deadline: { type: Date }, // Registration deadline
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('alumnieventsds', alumniEventsSchema);
