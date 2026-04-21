const mongoose=require('mongoose');

const employerfeedbackschema = new mongoose.Schema({
    name: {
        type: String
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
    ename: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: false
    },
    sname: {
        type: String,
        required: [true,'Please enter student name'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter student department']
    },
    batch: {
        type: String,
        required: [true,'Please enter student batch']
    },
    feedbackdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    question: {
        type: String,
        required: [true,'Please enter question'],
        unique: false
    },
    option: {
        type: String,
        unique: false
    },
    
    score: {
        type: Number,
        required: [true,'Please enter score'],
        unique: false
    }
})
//
const EmployerFeedback=mongoose.model('EmployerFeedback',employerfeedbackschema);

module.exports=EmployerFeedback;

