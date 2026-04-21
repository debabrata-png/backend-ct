const mongoose=require('mongoose');

const njobsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    year: {
type: String
},
company: {
type: String
},
jobtitle: {
type: String
},
jobdescription: {
type: String
},
lastapplydate: {
type: Date
},
eligibility: {
type: String
},
salary: {
type: Number
},
domain: {
type: String
},
type: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const njobs=mongoose.model('njobs',njobsschema);

module.exports=njobs;

