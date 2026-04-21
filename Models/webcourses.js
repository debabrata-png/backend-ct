const mongoose=require('mongoose');

const webcoursesschema = new mongoose.Schema({
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
title: {
type: String
},
category: {
type: String
},
description: {
type: String
},
image: {
type: String
},
applylink: {
type: String
},
level: {
type: String
},
type: {
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
const webcourses=mongoose.model('webcourses',webcoursesschema);

module.exports=webcourses;

