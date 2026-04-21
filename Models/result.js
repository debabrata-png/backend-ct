const mongoose=require('mongoose');

const resultschema = new mongoose.Schema({
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
    programcode: {
        type: String,
        required: [true,'Please enter program code'],
        unique: false
    },
    programname: {
        type: String,
        required: [true,'Please enter program name'],
        unique: false
    },
    
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    lastdate: {
        type: Date,
        required: [true,'Please enter last date of exam'],
        unique: false
    },
    resultdate: {
        type: Date,
        required: [true,'Please enter date of result declaration'],
        unique: false
    },
    noofdays: {
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
const Result=mongoose.model('Result',resultschema);

module.exports=Result;

