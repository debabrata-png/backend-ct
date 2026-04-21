const mongoose=require('mongoose');

const lsyllabusschema = new mongoose.Schema({
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
year: {
type: String
},
coursename: {
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
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const lsyllabus=mongoose.model('lsyllabus',lsyllabusschema);

module.exports=lsyllabus;

