const mongoose=require('mongoose');

const ppulibindjrnlschema = new mongoose.Schema({
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
const ppulibindjrnl=mongoose.model('ppulibindjrnl',ppulibindjrnlschema);

module.exports=ppulibindjrnl;

