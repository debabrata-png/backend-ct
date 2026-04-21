const mongoose=require('mongoose');

const neventreqschema = new mongoose.Schema({
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
event: {
type: String
},
description: {
type: String
},
amount: {
type: Number
},
transactiondate: {
type: Date
},
department: {
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
const neventreq=mongoose.model('neventreq',neventreqschema);

module.exports=neventreq;

