const mongoose=require('mongoose');

const pconsentschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
admid: {
type: String
},
title: {
type: String
},
description: {
type: String
},
consentby: {
type: String
},
relation: {
type: String
},
cdate: {
type: Date
},
link: {
type: String
},
doccomments: {
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
const pconsent=mongoose.model('pconsent',pconsentschema);

module.exports=pconsent;

