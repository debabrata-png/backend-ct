const mongoose=require('mongoose');

const pwdschema = new mongoose.Schema({
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
    speech: {
        type: Number,
        required: [true,'Please enter no.of speech hearing impairement learners '],
        unique: false
    },
    loco: {
        type: Number,
        required: [true,'Please enter no.of loco motor impairement learners'],
        unique: false
    },
    visual: {
        type: Number,
        required: [true,'Please enter no.of speech impairement learners'],
        unique: false
    },
    vision: {
        type: Number,
        required: [true,'Please enter no.of vision impairement learners'],
        unique: false
    },
    others: {
        type: Number,
        required: [true,'Please enter no.of other impairement learners'],
        unique: false
    },
    totalpwd: {
        type: Number,
        required: [true,'Please enter total no.of pwd learners applied'],
        unique: false
    },
    pwdenr: {
        type: Number,
        required: [true,'Please enter total no.of pwd learners enrolled'],
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
const PwdLearners=mongoose.model('PwdLearners',pwdschema);

module.exports=PwdLearners;

