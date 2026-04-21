const mongoose=require('mongoose');

const mcalendarschema = new mongoose.Schema({
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
course: {
type: String
},
coursecode: {
type: String
},
title: {
type: String
},
eventdate: {
type: Date
},
type: {
type: String
},
location: {
type: String
},
duration: {
type: Number
},
monthofyear: {
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
const mcalendar=mongoose.model('mcalendar',mcalendarschema);

module.exports=mcalendar;

