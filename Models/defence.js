const mongoose=require('mongoose');

const defenceschema = new mongoose.Schema({
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
    exservice: {
        type: Number,
        required: [true,'Please enter no.of ex service men learners '],
        unique: false
    },
    warwidow: {
        type: Number,
        required: [true,'Please enter no.of warwidow learners' ],
        unique: false
    },
    defence: {
        type: Number,
        required: [true,'Please enter no.of defence learners'],
        unique: false
    },
    total: {
        type: Number,
        required: [true,'Please enter total no.of learners'],
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
const DefenceLearners=mongoose.model('DefenceLearners',defenceschema);

module.exports=DefenceLearners;

