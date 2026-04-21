const mongoose=require('mongoose');

const ntransactionsschema = new mongoose.Schema({
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
transaction: {
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
bank: {
type: String
},
party: {
type: String
},
type: {
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
const ntransactions=mongoose.model('ntransactions',ntransactionsschema);

module.exports=ntransactions;

