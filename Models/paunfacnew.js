const mongoose=require('mongoose');

const paunfacnewschema = new mongoose.Schema({
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
    college: {
type: String
},
department: {
type: String
},
degrencrse: {
type: String
},
faculty: {
type: String
},
ifregular: {
type: String
},
designation: {
type: String
},
resadrs1: {
type: String
},
resadrs2: {
type: String
},
district: {
type: String
},
phone: {
type: Number
},
mobile: {
type: Number
},
email: {
type: String
},
gender: {
type: String
},
community: {
type: String
},
pan: {
type: String
},
passport: {
type: String
},
adhar: {
type: String
},
fcodecoe: {
type: String
},
fcodeaicte: {
type: String
},
dob: {
type: Date
},
age: {
type: Number
},
payscale: {
type: Number
},
basicpay: {
type: Number
},
emoluments: {
type: String
},
level: {
type: String
},
group: {
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
const paunfacnew=mongoose.model('paunfacnew',paunfacnewschema);

module.exports=paunfacnew;

