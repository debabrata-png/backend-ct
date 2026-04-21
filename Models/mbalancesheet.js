const mongoose=require('mongoose');

const mbalancesheetschema = new mongoose.Schema({
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
accgroup: {
type: String
},
account: {
type: String
},
acctype: {
type: String
},
cogs: {
type: String
},
amount: {
type: Number
},
debit: {
type: Number
},
credit: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const mbalancesheet=mongoose.model('mbalancesheet',mbalancesheetschema);

module.exports=mbalancesheet;

