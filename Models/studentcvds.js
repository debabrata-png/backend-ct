const mongoose = require("mongoose");

const studentcvschema = new mongoose.Schema({
    studentname: { type: String },
    studentemail: { type: String },
    studentphone: { type: String },
    linkdenprofile: { type: String },
    githubprofile: { type: String },
    profilesummery: { type: String },
    // 10th board and marks
    tenthboard: {type: String},
    tenthmarks: {type: String},
    // twelth board and marks
    twelthboard: {type: String},
    twelthmarks: {type: String},
    // university/college marks
    programcode: {type: String},
    institutename: {type: String},
    sem1marks: {type: String},
    sem2marks: {type: String},
    sem3marks: {type: String},
    sem4marks: {type: String},
    sem5marks: {type: String},
    sem6marks: {type: String},
    sem7marks: {type: String},
    sem8marks: {type: String},
    totalcgpa: {type: Number},
    skills: [{type: String}],
    experience: [{ companyname: { type: String }, desc: { type: String }, exptype: { type: String } }],
    projects: [{ projectname: { type: String }, desc: { type: String }, technologies: { type: String }, projectlink: { type: String } }],
    colid: { type: Number }
})

const studentcvds = mongoose.model("studentcvds", studentcvschema);

module.exports = studentcvds;