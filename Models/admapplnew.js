const mongoose=require('mongoose');

const admapplnewschema = new mongoose.Schema({
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
program: {
type: String
},
programcode: {
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
ispwd: {
type: String
},
pwdcategory: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
type: String
},
pincode: {
type: String
},
email: {
type: String
},
phone: {
type: String
},
tenth: {
type: Number
},
tenthboard: {
type: String
},
tenthstream: {
type: String
},
twelveth: {
type: Number
},
twelveboard: {
type: String
},
twelvestream: {
type: String
},
extracur: {
type: String
},
sports: {
type: String
},
hostel: {
type: String
},
father: {
type: String
},
fphone: {
type: String
},
femail: {
type: String
},
mother: {
type: String
},
mcontact: {
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
const admapplnew=mongoose.model('admapplnew',admapplnewschema);

module.exports=admapplnew;

