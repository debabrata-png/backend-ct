const mongoose=require('mongoose');

const lmsvideoscschema = new mongoose.Schema({
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
    videoid: {
type: String
},
coursecode: {
type: String
},
video: {
type: String
},
title: {
type: String
},
image: {
type: String
},
voicetext: {
type: String
},
duration: {
type: Number
},
type: {
type: String
},
language: {
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
const lmsvideosc=mongoose.model('lmsvideosc',lmsvideoscschema);

module.exports=lmsvideosc;

