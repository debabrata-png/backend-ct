const mongoose=require('mongoose');

const rsmufacnewupschema = new mongoose.Schema({
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
fname: {
type: String
},
sex: {
type: String
},
dob: {
type: Date
},
depname: {
type: String
},
resadd: {
type: String
},
ressaddd: {
type: String
},
dist: {
type: String
},
mobnum: {
type: Number
},
email: {
type: String
},
com: {
type: String
},
panno: {
type: Number
},
aadhno: {
type: Number
},
ifsccode: {
type: String
},
acnum: {
type: Number
},
grosspay: {
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
const rsmufacnewup=mongoose.model('rsmufacnewup',rsmufacnewupschema);

module.exports=rsmufacnewup;

