const mongoose = require('mongoose');

const communicationlogdsschema = new mongoose.Schema({
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'crmh1',
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    channel: {
        type: String,
        required: true  // email / sms / whatsapp
    },
    template_used: {
        type: String
    },
    subject: {
        type: String
    },
    content: {
        type: String
    },
    sent_date: {
        type: Date,
        default: Date.now
    },
    delivery_status: {
        type: String,
        default: 'Sent'  // Sent / Delivered / Failed / Bounced
    },
    open_status: {
        type: String  // Opened / Not Opened
    },
    open_date: {
        type: Date
    },
    click_status: {
        type: String  // Clicked / Not Clicked
    },
    click_date: {
        type: Date
    },
    sent_by: {
        type: String  // Email or 'System' for automated
    },
    campaign_id: {
        type: String  // If part of drip campaign
    }
}, {
    timestamps: true
});

const communicationlogds = mongoose.model('communicationlogds', communicationlogdsschema);
module.exports = communicationlogds;
