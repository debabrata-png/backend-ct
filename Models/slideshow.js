const mongoose=require('mongoose');

const slideshowschema = new mongoose.Schema({
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
    moduleid: {
type: String
},
description: {
type: String
},
imagelink: {
type: String
},
type: {
type: String
},
slideno: {
type: Number
},
ctype: {
type: String
},
duration: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const slideshow=mongoose.model('slideshow',slideshowschema);

module.exports=slideshow;

