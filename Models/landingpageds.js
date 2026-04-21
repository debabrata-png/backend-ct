const mongoose = require('mongoose');

const landingpagedsschema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    page_name: {
        type: String,
        required: true
    },
    page_slug: {
        type: String,
        required: true,
        unique: true
    },
    page_url: {
        type: String // Full URL
    },
    category: {
        type: String,
        required: true // Which category this landing page is for
    },
    form_fields: [{
        field_name: String,
        field_label: String,
        field_type: String, // text / email / phone / select / textarea
        is_required: Boolean,
        options: [String] // For select fields
    }],
    page_content: {
        headline: String,
        subheadline: String,
        description: String,
        image_url: String,
        cta_button_text: String
    },
    qr_codes: [{
        qr_name: String, // e.g., "Instagram Campaign"
        source: String, // e.g., "Instagram"
        qr_data_url: String, // Base64 QR code image
        created_at: {
            type: Date,
            default: Date.now
        }
    }],
    analytics_enabled: {
        type: String,
        default: 'Yes'
    },
    visit_count: {
        type: Number,
        default: 0
    },
    conversion_count: {
        type: Number,
        default: 0
    },
    is_active: {
        type: String,
        default: 'Yes'
    },
    created_by: {
        type: String // Admin email
    }
}, {
    timestamps: true
});

// Export with check to prevent recompilation
module.exports = mongoose.model('landingpageds', landingpagedsschema);
