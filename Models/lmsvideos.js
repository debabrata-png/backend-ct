const mongoose=require('mongoose');

const lmsvideosschema = new mongoose.Schema({
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
    coursecode: {
type: String
},
title: {
type: String
},
description: {
type: String
},
module: {
type: String
},
type: {
type: String
},
target: {
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
const lmsvideos=mongoose.model('lmsvideos',lmsvideosschema);

module.exports=lmsvideos;

