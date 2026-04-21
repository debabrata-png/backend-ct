const mongoose = require('mongoose');

const leadactivitydsschema = new mongoose.Schema({
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'crmh1',
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    activity_type: {
        type: String,
        required: true  // call / email / whatsapp / sms / meeting / campus_visit / document_upload / form_sent / payment / note / brochure_sent / fee_structure_sent
    },
    activity_date: {
        type: Date,
        default: Date.now
    },
    performed_by: {
        type: String,  // Email of user (counsellor or admin)
        required: true
    },
    duration: {
        type: Number  // Duration in minutes (for calls/meetings)
    },
    notes: {
        type: String
    },
    outcome: {
        type: String  // Interested / Not Interested / Call Back / No Answer / Busy / Wrong Number / Meeting Scheduled
    },
    next_action: {
        type: String
    },
    next_followup_date: {
        type: Date
    }
}, {
    timestamps: true
});

const leadactivityds = mongoose.model('leadactivityds', leadactivitydsschema);
module.exports = leadactivityds;
