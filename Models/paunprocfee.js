const mongoose=require('mongoose');

const paunprocfeeschema = new mongoose.Schema({
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
    coursename: {
type: String
},
noofcourse: {
type: Number
},
inspecfee: {
type: Number
},
totam: {
type: Number
},
amount: {
type: Number
},
utrno: {
type: String
},
dof: {
type: Date
},
bankname: {
type: String
},
branch: {
type: String
},
nofbankwithbranch: {
type: String
},
accno: {
type: Number
},
accname: {
type: String
},
ifsccode: {
type: String
},
micrcode: {
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
const paunprocfee=mongoose.model('paunprocfee',paunprocfeeschema);

module.exports=paunprocfee;

