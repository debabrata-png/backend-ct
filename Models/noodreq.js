const mongoose=require('mongoose');

const noodreqschema = new mongoose.Schema({
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
task: {
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
const noodreq=mongoose.model('noodreq',noodreqschema);

module.exports=noodreq;

