const mongoose=require('mongoose');

const nlulegaldatabasesschema = new mongoose.Schema({
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
subscriptiondate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nlulegaldatabases=mongoose.model('nlulegaldatabases',nlulegaldatabasesschema);

module.exports=nlulegaldatabases;

