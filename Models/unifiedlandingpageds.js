const mongoose = require('mongoose');

const unifiedlandingpagedsschema = new mongoose.Schema({
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
        unique: false
    },
    page_url: {
        type: String // Full URL
    },
    category: {
        type: String,
        required: false // Not required for unified landing pages
    },
    form_fields: [{
        field_label: { type: String, required: true },
        field_name: { type: String, required: true },
        field_type: { type: String, required: true }, // text, email, number, textarea
        is_required: { type: Boolean, default: false }
    }],
    page_content: {
        headline: { type: String },
        subheadline: { type: String },
        description: { type: String },
        cta_button_text: { type: String, default: "Submit" },
        image_url: { type: String }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    conversion_count: {
        type: Number,
        default: 0
    },
    qr_codes: [{
        qr_name: String,
        source: String,
        qr_data_url: String, // Base64
        created_at: { type: Date, default: Date.now }
    }],
    visit_count: { type: Number, default: 0 }
});

module.exports = mongoose.model('unifiedlandingpageds', unifiedlandingpagedsschema);
