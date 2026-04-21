const mongoose=require('mongoose');

const genderschema = new mongoose.Schema({
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
    male: {
        type: Number,
        required: [true,'Please enter no.of male learners '],
        unique: false
    },
    female: {
        type: Number,
        required: [true,'Please enter no.of female learners'],
        unique: false
    },
    transgender: {
        type: Number,
        required: [true,'Please enter no.of transgender learners'],
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
const GenderLearners=mongoose.model('GenderLearners',genderschema);

module.exports=GenderLearners;

