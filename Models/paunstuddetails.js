const mongoose=require('mongoose');

const paunstuddetailsschema = new mongoose.Schema({
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
    degree: {
type: String
},
course: {
type: String
},
sancintake: {
type: Number
},
boys: {
type: Number
},
girls: {
type: Number
},
totalstud: {
type: Number
},
religion: {
type: String
},
relgboys: {
type: Number
},
relggirls: {
type: Number
},
community: {
type: String
},
comboys: {
type: Number
},
comgirls: {
type: Number
},
nationality: {
type: String
},
natboys: {
type: Number
},
natgirls: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const paunstuddetails=mongoose.model('paunstuddetails',paunstuddetailsschema);

module.exports=paunstuddetails;

