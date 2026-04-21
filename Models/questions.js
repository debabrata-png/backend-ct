const mongoose=require('mongoose');

const questionschema = new mongoose.Schema({
    question: {
        type: String,
        required: [true,'Please enter question']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    examid: {
        type: String,
        required: [true,'Please enter examid'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    option: {
        type: String,
        required: [true,'Please enter option'],
        unique: false
    },
    difficulty: {
        type: String,
        required: [true,'Please enter difficulty'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    module: {
        type: String,
        required: [true,'Please enter module'],
        unique: false
    },
    co: {
        type: String,
        required: [true,'Please enter CO Code'],
        unique: false
    },
    po: {
        type: String,
        required: [true,'Please enter PO Code'],
        unique: false
    },
    questiongroup: {
        type: String,
        required: [true,'Please enter question group'],
        unique: false
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
    timeinsec: {
        type: Number,
        required: [true,'Please enter time in seconds'],
        unique: false
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Question=mongoose.model('Question',questionschema);

module.exports=Question;

