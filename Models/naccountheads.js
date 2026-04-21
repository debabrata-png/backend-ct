const mongoose=require('mongoose');

const naccountheadsschema = new mongoose.Schema({
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
    account: {
type: String
},
acccode: {
type: String
},
description: {
type: String
},
region: {
type: String
},
type: {
type: String
},
category: {
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
const naccountheads=mongoose.model('naccountheads',naccountheadsschema);

module.exports=naccountheads;

