const mongoose=require('mongoose');

const highereduschema = new mongoose.Schema({
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
    studentname: {
        type: String,
        required: [true,'Please enter student name enrolling to higher education'],
        unique: false
    },
    programgrad: {
        type: String,
        required: [true,'Please enter program name student graduated from'],
        unique: false
    },
    programcode: {
        type: String
    },
    institution: {
        type: String,
        required: [true,'Please enter name of instituion student joined'],
        unique: false
    },
    programadm: {
        type: String,
        required: [true,'Please enter program name student admitted to'],
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
const HigherEducation=mongoose.model('HigherEducation',highereduschema);

module.exports=HigherEducation;

