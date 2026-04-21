const mongoose=require('mongoose');

const austudu1schema = new mongoose.Schema({
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
    inscode: {
type: String
},
institution: {
type: String
},
admyear: {
type: String
},
department: {
type: String
},
programcode: {
type: String
},
program: {
type: String
},
lateral: {
type: String
},
section: {
type: String
},
rollno: {
type: String
},
regno: {
type: String
},
student: {
type: String
},
gender: {
type: String
},
category: {
type: String
},
nationality: {
type: String
},
studstatus: {
type: String
},
medium: {
type: String
},
aadhar: {
type: Number
},
email: {
type: String
},
mobile: {
type: Number
},
emis: {
type: Number
},
hscboard: {
type: String
},
uguniv: {
type: String
},
diffabled: {
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
const austudu1=mongoose.model('austudu1',austudu1schema);

module.exports=austudu1;

