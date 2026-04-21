const mongoose=require('mongoose');

const higherexamschema = new mongoose.Schema({
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
        required: [true,'Please enter academic year'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter roll/registration number for the exam'],
        unique: false
    },
    studentname: {
        type: String,
        required: [true,'Please enter name of student selected/qualified the examination '],
        unique: false
    },
    programname: {
        type: String
    },
    programcode: {
        type: String
    },
    level: {
        type: String
    },
    examname: {
        type: String,
        required: [true,'Please enter name of exam'],
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
const HigherExam=mongoose.model('HigherExam',higherexamschema);

module.exports=HigherExam;

