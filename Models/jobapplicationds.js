const mongoose = require("mongoose");

const jobapplicationschema = new mongoose.Schema({
    jobtitle: { type: String },
    name: {
        type: String
    },
    user: {
        type: String
    },
    year: {
type: String
},
sector: {
type: String
},
programcode: {
type: String
},
salary: {
type: Number
},
    jobid: { type: mongoose.Schema.Types.ObjectId, ref: "jobds1", required: true },
    companyname: { type: String },
    companyemail: { type: String },
    studentname: { type: String },
    studentemail: { type: String },
    studentregno: { type: String },
    studentcv: { type: mongoose.Schema.Types.ObjectId, ref: "studentcvds", required: true },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interviewed', 'Selected', 'Rejected'],
        default: 'Applied'
    },
    colid: { type: Number, required: true }
}, { timestamps: true });

const jobapplicationds = mongoose.model("jobapplicationds1", jobapplicationschema);

module.exports = jobapplicationds;