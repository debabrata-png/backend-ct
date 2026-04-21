const mongoose = require('mongoose');

const dripcampaigndsschema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    campaign_name: {
        type: String,
        required: true
    },
    campaign_code: {
        type: String,
        unique: true
    },
    campaign_type: {
        type: String,
        required: true  // welcome / course_specific / application / conversion / nurturing
    },
    target_lead_stage: {
        type: String  // New Lead / Qualified / etc.
    },
    target_category: {
        type: String  // Specific category or 'All'
    },
    messages: [{
        day: Number,  // Day 0, 1, 2, 3
        channel: String,  // email / sms / whatsapp
        template_id: String,
        subject: String,
        content: String,
        attachment_url: String
    }],
    is_active: {
        type: String,
        default: 'Yes'
    },
    created_by: {
        type: String  // Admin email
    }
}, {
    timestamps: true
});

const dripcampaignds = mongoose.model('dripcampaignds', dripcampaigndsschema);
module.exports = dripcampaignds;
