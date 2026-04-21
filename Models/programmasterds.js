const mongoose = require('mongoose');

const coursemasterdsschema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true  // Must match categoryds.category_name
    },
    course_code: {
        type: String,
        required: true,
        unique: false
    },
    course_name: {
        type: String,
        required: true
    },
    institution: {
        type: String
    },
    program_type: {
        type: String // e.g., Undergraduate, Postgraduate, Diploma
    },
    total_seats: {
        type: Number,
        default: 0
    },
    duration: {
        type: String  // 3 Years / 4 Years / 5 Years
    },
    eligibility: {
        type: String  // 12th Pass / Graduate
    },
    fee_structure: {
        total_fee: Number,
        application_fee: Number,
        first_installment: Number,
        installments: Number
    },
    brochure_url: {
        type: String
    },
    syllabus_url: {
        type: String
    },
    placement_highlights: {
        type: String
    },
    faculty_info: {
        type: String
    },
    accreditation: {
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

const programmasterds = mongoose.model('programmasterds', coursemasterdsschema);
module.exports = programmasterds;