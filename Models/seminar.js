const mongoose=require('mongoose');

const seminarschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    duration: {
        type: String,
        required: [true,'Please enter duration'],
        unique: false
    },
    yop: {
        type: String,
        required: [true,'Please enter year of publication'],
        unique: false
    },
    membership: {
        type: String,
        required: [true,'Please enter membership'],
        unique: false
    },
    amount: {
        type: Number,
        required: [true,'Please enter amount received'],
        unique: false
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    role: {
        type: String
    },
    paper: {
        type: String
    },
    level: {
        type: String
    },
    doclink: {
        type: String
    },
    type: {
        type: String
    },
    
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Seminar=mongoose.model('Seminar',seminarschema);

module.exports=Seminar;

