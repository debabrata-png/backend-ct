const mongoose=require('mongoose');

const curgapschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    gap: {
        type: String,
        required: [true,'Please enter gap'],
        unique: false
    },
    actiontaken: {
        type: String,
        required: [true,'Please enter action taken'],
        unique: false
    },
    actiondate: {
        type: Date,
        required: [true,'Please enter action date'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    resource: {
        type: String,
        required: [true,'Please enter issn'],
        unique: false
    },
    mode: {
        type: String,
        required: [true,'Please enter article link'],
        unique: false
    },
    noofstudents: {
        type: Number,
        required: [true,'Please enter no of students']
    },
    department: {
        type: String
    },
    program: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    relevance: {
        type: String,
        required: [true,'Please enter relevance'],
        unique: false
    }
})
//
const Curgap=mongoose.model('Curgap',curgapschema);

module.exports=Curgap;

