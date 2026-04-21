const mongoose=require('mongoose');

const feedbackschema = new mongoose.Schema({
    name: {
        type: String
    },
    regno: {
        type: String,
        required: [true,'Please enter regno']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    coursecode: {
        type: String,
        unique: false
    },
    faculty: {
        type: String,
        unique: false
    },
    facultyemail: {
        type: String,
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
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    score: {
        type: Number,
        required: [true,'Please enter score'],
        unique: false
    }
})
//
const Feedback=mongoose.model('Feedback',feedbackschema);

module.exports=Feedback;

