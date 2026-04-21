const mongoose = require('mongoose');

const sourcedsSchema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    source_name: {
        type: String,
        required: true
    },
    source_type: {
        type: String,
        enum: ['Organic', 'Paid', 'Referral', 'Direct', 'Social Media', 'Other'],
        default: 'Other'
    },
    description: {
        type: String
    },
    is_active: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    created_by: {
        type: String  // Admin email
    }
}, {
    timestamps: true
});

const sourceds = mongoose.model('sourceds', sourcedsSchema);
module.exports = sourceds;
