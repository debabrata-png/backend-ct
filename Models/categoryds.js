const mongoose = require('mongoose');

const categorydsschema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    category_name: {
        type: String,
        required: true  // Nursing / Law / Design / Science / Engineering
    },
    category_code: {
        type: String,
        required: true,
        unique: true
    },
    counsellors: [{
        counsellor_email: String,  // Email of counsellor
        counsellor_name: String,
        is_active: {
            type: String,
            default: 'Yes'
        }
    }],
    description: {
        type: String
    },
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

const categoryds = mongoose.model('categoryds', categorydsschema);
module.exports = categoryds;
