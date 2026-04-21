const mongoose = require("mongoose");

const examapplicationschema = new mongoose.Schema({
    studentname: {
        type: String,
        required: true,
        trim: true
    },
    studentemail: {
        type: String,   
        required: true,
        trim: true,
    },
    regno: {
        type: String,
        required: true,
    },
    examname: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    subjects: [{
        subjectcode: {
            type: String,
            trim: true
        },
        subjectname: {
            type: String,
            required: true,
            trim: true
        },
        enabled: {
            type: String,
            enum: ['yes', 'no'],
            default: 'yes'
        }
    }],
    examdate: {
        type: Date,
        required: true
    },
    applicationstatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }

}, {
    timestamps: true
})

const examApplicationmodel = mongoose.model("ExamApplication", examapplicationschema);

module.exports = examApplicationmodel;