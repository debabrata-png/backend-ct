const mongoose = require('mongoose');

const alumniEventsRegSchema = new mongoose.Schema({
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'alumnieventsds', required: true },
    registrationDate: { type: Date, default: Date.now },
    attendanceStatus: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('alumnieventsregds', alumniEventsRegSchema);
