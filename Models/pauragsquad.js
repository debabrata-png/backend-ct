const mongoose=require('mongoose');

const pauragsquadschema = new mongoose.Schema({
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
    position: {
type: String
},
title: {
type: String
},
firstname: {
type: String
},
lastname: {
type: String
},
designation: {
type: String
},
email: {
type: String
},
mobprsnl: {
type: String
},
officephn: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
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
const pauragsquad=mongoose.model('pauragsquad',pauragsquadschema);

module.exports=pauragsquad;

