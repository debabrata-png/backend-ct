const mongoose=require('mongoose');

const classschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    year: {
        type: String
    },
    programcode: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    section: {
        type: String,
        required: [true,'Please enter section'],
        unique: false
    },
    classdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    classtime: {
        type: String,
        required: [true,'Please enter issn'],
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
    topic: {
        type: String,
        required: [true,'Please enter topic'],
        unique: false
    },
    module: {
        type: String,
        required: [true,'Please enter module'],
        unique: false
    },
    enrollreq: {
        type: String,
        required: [true,'Please enter if enrollment is required'],
        unique: false
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
const Class=mongoose.model('Class',classschema);

module.exports=Class;

