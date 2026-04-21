const mongoose=require('mongoose');

const nauscholarshipschema = new mongoose.Schema({
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
const nauscholarship=mongoose.model('nauscholarship',nauscholarshipschema);

module.exports=nauscholarship;

