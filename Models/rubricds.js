const mongoose = require("mongoose");

const rubricschema = new mongoose.Schema({
    name: {type: String},
    user: {type: String},
    colid: {type: Number},
    studentname: {type: String},
    regno: {type: String},
    program: {type: String},
    programcode: {type: String},
    year: {type: String},
    semester: {type: String},
    course: {type: String},
    coursecode:{type: String},
    exam: {type: String},
    examcode:{type: String},
    internalmarks: [{
        internalexamname: {type: String},
        internalfull: {type: Number},
        internalobtainmark: {type: Number}
    }],
    attendancemarks: [{
        attendancename: {type: String},
        attendancefull: {type: Number},
        attendanceobtainmark: {type: Number}
    }],
    internshipmarks: [{
        internshipname: {type: String},
        internshipfull: {type: Number},
        internshipobtainmark: {type: Number}
    }],
    extracurriculummarks: [{
        extracurriculumname: {type: String},
        extracurriculumfull: {type: Number},
        extracurriculumobtainmark: {type: Number}
    }],
    externalfull: {type: Number},
    externalmarks: {type: Number}
});

const rubricds = mongoose.model("rubricds", rubricschema);
module.exports = rubricds;