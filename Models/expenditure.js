const mongoose=require('mongoose');

const expenditureschema = new mongoose.Schema({
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
        required: [true,'Please enter academic year'],
        unique: false
    },
    budget: {
        type: Number,
        required: [true,'Please enter budget allocated for infrastructure augmentation'],
        unique: false
    },
    infraexp: {
        type: Number,
        required: [true,'Please enter expenditure for infrastructure augmentation'],
        unique: false
    },
    totalexp: {
        type: Number,
        required: [true,'Please enter total expenditure'],
        unique: false
    },
    academicexp: {
        type: Number,
        required: [true,'Please enter expenditure on maintenance of academic facilities'],
        unique: false
    },
    physicalexp: {
        type: Number,
        required: [true,'Please enter expenditure on maintenance of physical facilities'],
        unique: false
    },

    booksexp: {
        type: Number
        },
    otherexp: {
        type: Number
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
const Infrastructure=mongoose.model('Infrastructure',expenditureschema);

module.exports=Infrastructure;

