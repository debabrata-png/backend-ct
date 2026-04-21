const mongoose=require('mongoose');

const ngrouppagesschema = new mongoose.Schema({
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
    group1: {
type: String
},
pagelink: {
type: String
},
description: {
type: String
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
const ngrouppages=mongoose.model('ngrouppages',ngrouppagesschema);

module.exports=ngrouppages;

