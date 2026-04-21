const mongoose=require('mongoose');

const admextraschema = new mongoose.Schema({
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
    activity: {
type: String
},
year: {
type: String
},
activitydate: {
type: Date
},
description: {
type: String
},
org: {
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
const admextra=mongoose.model('admextra',admextraschema);

module.exports=admextra;

