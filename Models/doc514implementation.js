const mongoose=require('mongoose');

const doc514implementationschema = new mongoose.Schema({
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
    grievance: {
type: String
},
implementation: {
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
const doc514implementation=mongoose.model('doc514implementation',doc514implementationschema);

module.exports=doc514implementation;

