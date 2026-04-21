const mongoose=require('mongoose');

const alumniworkschema = new mongoose.Schema({
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
    org: {
type: String
},
doj: {
type: Date
},
dol: {
type: String
},
designation: {
type: String
},
description: {
type: String
},
salary: {
type: Number
},
orgaddress: {
type: String
},
orgcontact: {
type: String
},
programname: {
type: String
},
batch: {
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
const alumniwork=mongoose.model('alumniwork',alumniworkschema);

module.exports=alumniwork;

