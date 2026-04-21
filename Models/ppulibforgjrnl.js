const mongoose=require('mongoose');

const ppulibforgjrnlschema = new mongoose.Schema({
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
    department: {
type: String
},
degree: {
type: String
},
coursename: {
type: String
},
title: {
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
const ppulibforgjrnl=mongoose.model('ppulibforgjrnl',ppulibforgjrnlschema);

module.exports=ppulibforgjrnl;

