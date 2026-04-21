const mongoose=require('mongoose');

const econtentschema = new mongoose.Schema({
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
    fname: {
        type: String,
        required: [true,'Please enter name of the teacher'],
        unique: false
    },
    module: {
        type: String,
        required: [true,'Please enter name of the module developed'],
        unique: false
    },
    
    platform: {
        type: String,
        required: [true,'Please enter platform on which module developed'],
        unique: false
    },
    date: {
        type: Date,
        required: [true,'Please enter date of launching e-content'],
        unique: false
    },
    facility: {
        type: String,
        required: [true,'Please enter e-content development facility'],
        unique: false
    },
    doclink: {
        type: String,
        required: [true,'Please enter link to document and facility'],
        unique: false
    },
    
    videolink: {
        type: String,
        required: [true,'Please enter link to videos'],
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
const Econtent=mongoose.model('Econtent',econtentschema);

module.exports=Econtent;

