const mongoose=require('mongoose');

const univfacschema = new mongoose.Schema({
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
    faculty: {
type: String
},
description: {
type: String
},
address: {
type: String
},
campus: {
type: String
},
dean: {
type: String
},
deanemail: {
type: String
},
type: {
type: String
},
level: {
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
const univfac=mongoose.model('univfac',univfacschema);

module.exports=univfac;

