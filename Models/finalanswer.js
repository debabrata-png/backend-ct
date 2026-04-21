const mongoose=require('mongoose');

const finalanswerschema = new mongoose.Schema({
    question: {
        type: String,
        required: [true,'Please enter question']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    name: {
        type: String,
        required: [true,'Please enter name'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    examid: {
        type: String,
        required: [true,'Please enter examid'],
        unique: false
    },
    questionid: {
        type: String,
        required: [true,'Please enter questionid'],
        unique: false
    },
    link: {
        type: String
    },
    option: {
        type: String,
        required: [true,'Please enter option'],
        unique: false
    },
    comments: {
        type: String
    },
    evaluator: {
        type: String
    },
    coursecode: {
        type: String
    },
    programcode: {
        type: String
    },
    difficulty: {
        type: String
    },
    answerdate: {
        type: Date
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    module: {
        type: String
    },
    co: {
        type: String
    },
    po: {
        type: String
    },
    questiongroup: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    fullmarks: {
        type: Number,
        required: [true,'Please enter fullmarks'],
        unique: false
    },
    score: {
        type: Number
    },
    pscore: {
        type: Number
    },
    timeinsec: {
        type: Number
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Finalanswer=mongoose.model('Finalanswer',finalanswerschema);

module.exports=Finalanswer;

