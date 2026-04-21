const mongoose=require('mongoose');

const nlurecognitionsschema = new mongoose.Schema({
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
type: String
},
title: {
type: String
},
specificfield: {
type: String
},
recogdate: {
type: Date
},
period: {
type: String
},
body: {
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
const nlurecognitions=mongoose.model('nlurecognitions',nlurecognitionsschema);

module.exports=nlurecognitions;

