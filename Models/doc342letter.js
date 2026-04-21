const mongoose=require('mongoose');

const doc342letterschema = new mongoose.Schema({
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
student: {
type: String
},
rego: {
type: String
},
title: {
type: String
},
guide: {
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
const doc342letter=mongoose.model('doc342letter',doc342letterschema);

module.exports=doc342letter;

