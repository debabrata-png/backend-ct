const mongoose=require('mongoose');

const paufaddqualifschema = new mongoose.Schema({
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
    score: {
type: String
},
file: {
type: String
},
title: {
type: Number
},
fphdaward: {
type: String
},
yoe: {
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
const paufaddqualif=mongoose.model('paufaddqualif',paufaddqualifschema);

module.exports=paufaddqualif;

