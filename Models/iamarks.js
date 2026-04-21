const mongoose=require('mongoose');

const iamarksschema = new mongoose.Schema({
    question: {
        type: String,
        required: [true,'Please enter question']
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
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    component: {
        type: String
    },
    semester: {
        type: String
    },
    academicyear: {
        type: String
    },
    repeat: {
        type: String
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
    }
})
//
const Iamarks=mongoose.model('Iamarks',iamarksschema);

module.exports=Iamarks;

