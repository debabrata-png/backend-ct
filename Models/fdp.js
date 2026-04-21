const mongoose=require('mongoose');

const fdpschema = new mongoose.Schema({
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
    
    faculty: {
        type: String,
        required: [true,'Please enter name of faculty '],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter the title of program'],
        unique: false
    },
    duration: {
        type: String,
        required: [true,'Please enter duration '],
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
const FDP=mongoose.model('FDP',fdpschema);

module.exports=FDP;

