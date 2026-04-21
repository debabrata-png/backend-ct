const mongoose=require('mongoose');

const doc715photosschema = new mongoose.Schema({
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
const doc715photos=mongoose.model('doc715photos',doc715photosschema);

module.exports=doc715photos;

