const mongoose=require('mongoose');

const explearningschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    
    },
    programname: {
        type: String,
        required: [true,'Please enter course name'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter course code'],
        unique: false
    },
    coursename: {
        type: String
    },
    coursecode: {
        type: String
    },
    type: {
        type: String,
        required: [true,'Please enter type of activity'],
        unique: false
    },
    activity: {
        type: String,
        required: [true,'Please enter name of activity'],
        unique: false
    },
    sname: {
        type: String,
        required: [true,'Please enter student name'],
        unique: false
    
    },
    regno: {
        type: String,
        required: [true,'Please enter registration number'],
        unique: false
    
    },
    noofstudents: {
        type: Number
        },
    fieldprojcomponents: {
        type: String
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
const ExperentialLearning=mongoose.model('ExperentialLearning',explearningschema);

module.exports=ExperentialLearning;

