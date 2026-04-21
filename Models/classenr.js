const mongoose=require('mongoose');

const classenrschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    student: {
        type: String,
        required: [true,'Please enter student'],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter course'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter program'],
        unique: false
    },
    programcode: {
        type: String
    },
    academicyear: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    semester: {
        type: String
    },
    section: {
        type: String
    },
    year: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    classgroup: {
        type: String
    },
    gender: {
        type: String
    },
    learning: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Classenr=mongoose.model('Classenr',classenrschema);

module.exports=Classenr;

