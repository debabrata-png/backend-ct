const mongoose=require('mongoose');

const meetingschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    category: {
        type: String
    },
    quarter: {
        type: String
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    documentlink: {
        type: String,
        required: [true,'Please enter link of meeting minutes'],
        unique: false
    },
    classdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    classtime: {
        type: String,
        required: [true,'Please enter time'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    academicyear: {
        type: String,
        required: [true,'Please enter academicyear'],
        unique: false
    },
    topic: {
        type: String,
        required: [true,'Please enter topic'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Meeting=mongoose.model('Meeting',meetingschema);

module.exports=Meeting;

