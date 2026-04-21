const mongoose=require('mongoose');

const misections1schema = new mongoose.Schema({
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
    testid: {
type: String
},
section: {
type: String
},
description: {
type: String
},
noofquestions: {
type: Number
},
imagelink: {
type: String
},
doclink: {
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
const misections1=mongoose.model('misections1',misections1schema);

module.exports=misections1;

