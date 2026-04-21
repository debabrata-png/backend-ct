const mongoose = require("mongoose");

const jobapplicationformschema = new mongoose.Schema({
    name: { type: String },
    user: { type: String },
    jobtitle: { type: String },
    jobid: {type: mongoose.Schema.Types.ObjectId, required: true},
    applicantname: { type: String },
    applicantemail: { type: String },
    applicantphone: { type: String },
    linkdenprofile: { type: String },
    githubprofile: { type: String },
    profilesummery: { type: String },
    skills: [{ type: String }],
    experience: [{ companyname: { type: String }, desc: { type: String }, exptype: { type: String } }],
    projects: [{ projectname: { type: String }, desc: { type: String }, technologies: { type: String }, projectlink: { type: String } }],
    resumelink: { type: String },
    year: { type: String },
    colid: { type: Number },
    status: {
        type: String,
         enum: ['Applied', 'Shortlisted', 'Interviewed', 'Selected', 'Rejected'],
        default: 'Applied'
    }
}, {
    timestamps: true
})

const jobapplicationformds = mongoose.model("jobapplicationformds", jobapplicationformschema);

module.exports = jobapplicationformds;