const mongoose=require('mongoose');

const testnewschema = new mongoose.Schema({
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
coursecode: {
type: String
},
title: {
type: String
},
description: {
type: String
},
starttime: {
type: Date
},
endtime: {
type: Date
},
duration: {
type: Number
},
weightage: {
type: Number
},
type: {
type: String
},
level: {
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
const testnew=mongoose.model('testnew',testnewschema);

module.exports=testnew;

