const mongoose=require('mongoose');

const programbudgetschema = new mongoose.Schema({
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
programname: {
type: String
},
programcode: {
type: String
},
type: {
type: String
},
nonrecurringbudget: {
type: Number
},
recurringbudget: {
type: Number
},
nonrecurringexp: {
type: Number
},
recurringexp: {
type: Number
},
expperstudent: {
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
const programbudget=mongoose.model('programbudget',programbudgetschema);

module.exports=programbudget;

