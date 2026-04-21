const mongoose = require("mongoose");

const jobschema = new mongoose.Schema({
    companyname: {type: String},
    companyemail: {type: String},
    title: {type: String},
    description: {type: String},
    skills: [{type: String}],
    salary: {type: String},
    joblocation: {type: String},
    lastapplieddate: {type: Date},
    joiningdate:{type: Date},
    colid: {type: Number, required: true}
}, {timestamps: true});

const jobinternalds = mongoose.model("jobinternalds", jobschema);
module.exports = jobinternalds;