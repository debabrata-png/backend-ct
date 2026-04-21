const mongoose=require('mongoose');

const doc714photosschema = new mongoose.Schema({
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
    facility: {
type: String
},
description: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc714photos=mongoose.model('doc714photos',doc714photosschema);

module.exports=doc714photos;

