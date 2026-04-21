const mongoose=require('mongoose');

const coschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter course code'],
        unique: false
    },
    coursename: {
        type: String,
        required: [true,'Please enter course name'],
        unique: false
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    cocode: {
        type: String,
        required: [true,'Please enter CO code'],
        unique: false
    },
    co: {
        type: String,
        required: [true,'Please enter the value of CO'],
        unique: false
    }
})
//
const CourseOutcome=mongoose.model('CourseOutcome',coschema);

module.exports=CourseOutcome;

