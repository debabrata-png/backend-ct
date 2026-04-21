const mongoose = require("mongoose");

const jobschema = new mongoose.Schema({
    companyname: {type: String},
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
    companyemail: {type: String},
    title: {type: String},
    description: {type: String},
    skills: [{type: String}],
    salary: {type: Number},
    lastapplieddate: {type: Date},
    joiningdate:{type: Date},
    colid: {type: Number, required: true}
}, {timestamps: true});

const jobds = mongoose.model("jobds1", jobschema);
module.exports = jobds;