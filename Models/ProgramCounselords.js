const mongoose = require('mongoose');

const ProgramCounselorSchema = new mongoose.Schema({
    colid: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    institution: {
        type: String
    },
    program_type: {
        type: String
    },
    counsellor_name: {
        type: String
    },
    counsellor_email: {
        type: String
    },
    total_seats: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    eligibility: {
        type: String
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
        type: String
    }
}, {
    timestamps: true
});

const ProgramCounselords = mongoose.model('ProgramCounselords', ProgramCounselorSchema);
module.exports = ProgramCounselords;
