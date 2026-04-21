const mongoose=require('mongoose');

const ntrialbalanceschema = new mongoose.Schema({
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
acccode: {
type: String
},
account: {
type: String
},
transaction: {
type: String
},
category: {
type: String
},
group: {
type: String
},
debit: {
type: Number
},
credit: {
type: Number
},
transactiondate: {
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
const ntrialbalance=mongoose.model('ntrialbalance',ntrialbalanceschema);

module.exports=ntrialbalance;

