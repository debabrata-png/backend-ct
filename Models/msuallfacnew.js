const mongoose=require('mongoose');

const msuallfacnewschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
faculty: {
type: String
},
sex: {
type: String
},
address1: {
type: String
},
address2: {
type: String
},
district: {
type: String
},
pin: {
type: String
},
mobile: {
type: String
},
email: {
type: String
},
community: {
type: String
},
pan: {
type: String
},
aadhar: {
type: String
},
dateofbirth: {
type: Date
},
salary: {
type: Number
},
bank: {
type: String
},
account: {
type: String
},
accountno: {
type: String
},
ifsc: {
type: String
},
accounttype: {
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
const msuallfacnew=mongoose.model('msuallfacnew',msuallfacnewschema);

module.exports=msuallfacnew;

