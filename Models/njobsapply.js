const mongoose=require('mongoose');

const njobsapplyschema = new mongoose.Schema({
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
jobid: {
type: String
},
job: {
type: String
},
salary: {
type: Number
},
currentprogram: {
type: String
},
student: {
type: String
},
department: {
type: String
},
studentregno: {
type: String
},
studentcontact: {
type: String
},
selectiondate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const njobsapply=mongoose.model('njobsapply',njobsapplyschema);

module.exports=njobsapply;

