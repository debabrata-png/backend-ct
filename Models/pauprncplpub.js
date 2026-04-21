const mongoose=require('mongoose');

const pauprncplpubschema = new mongoose.Schema({
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
    principal: {
type: String
},
mobprsnl: {
type: String
},
email: {
type: String
},
title: {
type: String
},
journal: {
type: String
},
yop: {
type: String
},
issn: {
type: String
},
articlelink: {
type: String
},
journallink: {
type: String
},
ugclisted: {
type: String
},
hindex: {
type: String
},
citation: {
type: String
},
citationindex: {
type: String
},
level: {
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
const pauprncplpub=mongoose.model('pauprncplpub',pauprncplpubschema);

module.exports=pauprncplpub;

