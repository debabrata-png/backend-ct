const mongoose=require('mongoose');

const rsmuontstaffschema = new mongoose.Schema({
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
    dept: {
type: String
},
title: {
type: String
},
fname: {
type: String
},
lname: {
type: String
},
dsgntn: {
type: String
},
degree: {
type: String
},
doj: {
type: Date
},
Experience: {
type: Number
},
dob: {
type: Date
},
age: {
type: Number
},
pay_scale: {
type: Number
},
basic_pay: {
type: Number
},
gross_pay: {
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
const rsmuontstaff=mongoose.model('rsmuontstaff',rsmuontstaffschema);

module.exports=rsmuontstaff;

