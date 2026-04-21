const mongoose=require('mongoose');

const ustudschspschema = new mongoose.Schema({
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
sname: {
type: String
},
regno: {
type: String
},
amount: {
type: Number
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
const ustudschsp=mongoose.model('ustudschsp',ustudschspschema);

module.exports=ustudschsp;

