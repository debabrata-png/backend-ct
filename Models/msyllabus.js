const mongoose=require('mongoose');

const msyllabusschema = new mongoose.Schema({
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
module: {
type: String
},
description: {
type: String
},
credits: {
type: Number
},
courselink: {
type: String
},
type: {
type: String
},
completed: {
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
const msyllabus=mongoose.model('msyllabus',msyllabusschema);

module.exports=msyllabus;

