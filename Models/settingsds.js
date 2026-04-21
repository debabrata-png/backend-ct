const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true,
        unique: true
    },
    email_templates: [{
        name: String,
        subject: String,
        content: String
    }],
    sms_templates: [{
        name: String,
        content: String
    }],
    whatsapp_templates: [{
        name: String,
        content: String
    }],
    campaign_types: [{
        name: String,
        description: String
    }],
    call_provider_config: {
        provider_name: String,
        webhook_url: String
    },
    updated_by: String
}, {
    timestamps: true
});

const settingsds = mongoose.model('settingsds', settingsSchema);
module.exports = settingsds;
