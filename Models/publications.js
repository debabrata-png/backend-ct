const mongoose=require('mongoose');

const pubschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    journal: {
        type: String,
        required: [true,'Please enter journal'],
        unique: false
    },
    yop: {
        type: String,
        required: [true,'Please enter year of publication'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    issn: {
        type: String,
        required: [true,'Please enter issn'],
        unique: false
    },
    articlelink: {
        type: String,
        required: [true,'Please enter article link'],
        unique: false
    },
    journallink: {
        type: String,
        required: [true,'Please enter journal link'],
        unique: false
    },
    hindex: {
        type: String
    },
    citation: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    level: {
        type: String
    },
    citationindex: {
        type: String
    },
    doclink: {
        type: String
    },
    
    ugclisted: {
        type: String,
        required: [true,'Please enter if ugc listed'],
        unique: false
    }
})
//
const Pub=mongoose.model('Pub',pubschema);

module.exports=Pub;

