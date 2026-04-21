const mongoose=require('mongoose');

const explearnprojschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter year'],
        unique: false
    
    },
    programname: {
        type: String,
        required: [true,'Please enter program name'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter program code'],
        unique: false
    },
    coursename: {
        type: String,
        required: [true,'Please enter course name'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter course code'],
        unique: false
    },
    
    sname: {
        type: String,
        required: [true,'Please enter student name'],
        unique: false
    
    },
    
    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const ExperentialProject=mongoose.model('ExperentialProject',explearnprojschema);

module.exports=ExperentialProject;

