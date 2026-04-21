const mongoose = require('mongoose');
const crypto = require('crypto');

const apikeydsschema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    key_name: {
        type: String,
        required: true  // e.g., "Call Tracking Provider", "Website Form"
    },
    api_key: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: String  // create_lead / update_lead / webhook_access
    }],
    allowed_sources: [{
        type: String  // Which sources can use this key
    }],
    is_active: {
        type: String,
        default: 'Yes'
    },
    created_by: {
        type: String,  // Admin email
        required: true
    },
    valid_until: {
        type: Date
    },
    last_used: {
        type: Date
    },
    usage_count: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Generate API key before saving
apikeydsschema.pre('save', function(next) {
    if (!this.api_key) {
        this.api_key = 'crm_' + crypto.randomBytes(32).toString('hex');
    }
    next();
});

const apikeyds1 = mongoose.model('apikeyds1', apikeydsschema);
module.exports = apikeyds1;
