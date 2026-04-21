const mongoose = require("mongoose");

const rubricschema1 = new mongoose.Schema({
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
    externalfull: {type: Number},
    externalmarks: {type: Number}
});

const rubricds1 = mongoose.model("rubricds1", rubricschema1);
module.exports = rubricds1;