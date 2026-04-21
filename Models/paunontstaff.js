const mongoose=require('mongoose');

const paunontstaffschema = new mongoose.Schema({
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
    category: {
type: String
},
department: {
type: String
},
title: {
type: String
},
firstname: {
type: String
},
lastname: {
type: String
},
designation: {
type: String
},
qualification: {
type: String
},
doj: {
type: Date
},
prevexpinyear: {
type: Number
},
dob: {
type: Date
},
age: {
type: Number
},
sofpay: {
type: String
},
pbaspay: {
type: Number
},
emoluments: {
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
const paunontstaff=mongoose.model('paunontstaff',paunontstaffschema);

module.exports=paunontstaff;

