const mongoose=require('mongoose');

const parentfeedbackschema = new mongoose.Schema({
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
    pname: {
        type: String,
        unique: false
    },
    pemail: {
        type: String,
        unique: false
    },
    pphone: {
        type: String,
        unique: false
    },
    sname: {
        type: String,
        required: [true,'Please enter student name'],
        unique: false
    },
    sregno: {
        type: String,
        required: [true,'Please enter student regno']
    },
    program: {
        type: String,
        required: [true,'Please enter program name']
    },
    academicyear: {
        type: String,
        required: [true,'Please enter academic year'],
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
const ParentFeedback=mongoose.model('ParentFeedback',parentfeedbackschema);

module.exports=ParentFeedback;

