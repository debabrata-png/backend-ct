const mongoose=require('mongoose');

const rsmuragcomtschema = new mongoose.Schema({
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
    position: {
type: String
},
title: {
type: String
},
name: {
type: String
},
designation: {
type: String
},
email: {
type: String
},
mobile: {
type: Number
},
telephone: {
type: Number
},
address: {
type: String
},
address2: {
type: String
},
district: {
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
const rsmuragcomt=mongoose.model('rsmuragcomt',rsmuragcomtschema);

module.exports=rsmuragcomt;

