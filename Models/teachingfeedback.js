const mongoose=require('mongoose');

const teachingfeedbackschema = new mongoose.Schema({
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
    fsname: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter student regno']
    },
    department: {
        type: String,
        required: [true,'Please enter department name']
    },
    sem: {
        type: String,
        unique: false
    },
    year: {
        type: String,
        unique: false
    },
    degree: {
        type: String,
        unique: false
    },
    program: {
        type: String,
        unique: false
    },
    course: {
        type: String,
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
const TeachingFeedback=mongoose.model('TeachingFeedback',teachingfeedbackschema);

module.exports=TeachingFeedback;

