const mongoose=require('mongoose');

const rsmuprinupschema = new mongoose.Schema({
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
    prinname: {
type: String
},
bday: {
type: Date
},
age: {
type: Number
},
fatherName: {
type: String
},
address: {
type: String
},
district: {
type: String
},
officeno: {
type: Number
},
faxno: {
type: Number
},
mobno: {
type: Number
},
email: {
type: String
},
ugprogram: {
type: String
},
pgdegree: {
type: String
},
ugmarks: {
type: Number
},
pgmarks: {
type: Number
},
phddate: {
type: Date
},
joinDate: {
type: Date
},
panno: {
type: String
},
bankno: {
type: Number
},
adharno: {
type: Number
},
ifsccode: {
type: Number
},
qualifyapproval: {
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
const rsmuprinup=mongoose.model('rsmuprinup',rsmuprinupschema);

module.exports=rsmuprinup;

