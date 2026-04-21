const mongoose=require('mongoose');

const ncourseplanschema = new mongoose.Schema({
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
    coursecode: {
type: String
},
course: {
type: String
},
unit: {
type: String
},
co: {
type: String
},
content: {
type: String
},
contentdate: {
type: Date
},
hours: {
type: Number
},
reviseddate: {
type: Date
},
resources: {
type: String
},
outcome: {
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
const ncourseplan=mongoose.model('ncourseplan',ncourseplanschema);

module.exports=ncourseplan;

