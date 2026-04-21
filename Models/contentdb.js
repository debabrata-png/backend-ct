const mongoose=require('mongoose');

const type: {
type: String
},
category: {
type: String
},
description: {
type: String
},
dbschema = new mongoose.Schema({
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
    contentstatus1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const contentdb=mongoose.model('contentdb',contentdbschema);

module.exports=contentdb;

