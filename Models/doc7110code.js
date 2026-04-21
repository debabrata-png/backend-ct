const mongoose=require('mongoose');

const doc7110codeschema = new mongoose.Schema({
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
    item: {
type: String
},
type: {
type: String
},
approvedby: {
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
const doc7110code=mongoose.model('doc7110code',doc7110codeschema);

module.exports=doc7110code;

