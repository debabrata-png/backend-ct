const mongoose=require('mongoose');

const lcalendarschema = new mongoose.Schema({
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
coursecode: {
type: String
},
course: {
type: String
},
year: {
type: String
},
activity: {
type: String
},
description: {
type: String
},
planneddate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const lcalendar=mongoose.model('lcalendar',lcalendarschema);

module.exports=lcalendar;

