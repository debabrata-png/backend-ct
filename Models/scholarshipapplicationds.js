const mongoose = require('mongoose');

const scholarshipapplicationschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    user: {
        type: String,
        required: [true, 'Please enter user']
    },
    colid: {
        type: Number,
        required: [true, 'Please enter colid']
    },
    scholarshipname: {
        type: String,
        required: [true, 'Please enter scholarshipname']
    },
    applicantname: {
        type: String,
        required: [true, 'Please enter applicantname']
    },
    applicantemail : {
        type: String,
        required: [true, 'Please enter applicantemail']
    },
    regno: {
        type: String,
        required: [true, 'Please enter regno']
    },
    applicantphone : {
        type: String,
        required: [true, 'Please enter applicantphone']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    category: {
        type: String,
    },
    program: {
        type: String,
    },
    programcode: {
        type: String,
    },
    address: {
        type: String,
    },
    createdat: {
        type: Date,
        default: Date.now
    }
});

const scholarshipapplicationds = mongoose.model('scholarshipapplicationds', scholarshipapplicationschema);
module.exports = scholarshipapplicationds;