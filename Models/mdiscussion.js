const mongoose=require('mongoose');

const mdiscussionschema = new mongoose.Schema({
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
course: {
type: String
},
coursecode: {
type: String
},
title: {
type: String
},
submitdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const mdiscussion=mongoose.model('mdiscussion',mdiscussionschema);

module.exports=mdiscussion;

