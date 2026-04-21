const mongoose=require('mongoose');

const nnmouschema = new mongoose.Schema({
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
agency: {
type: String
},
duration: {
type: String
},
activities: {
type: String
},
noofparticipants: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nnmou=mongoose.model('nnmou',nnmouschema);

module.exports=nnmou;

