const mongoose=require('mongoose');

const empexpensesschema = new mongoose.Schema({
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
    type: {
type: String
},
year: {
type: String
},
expcode: {
type: String
},
from: {
type: String
},
to: {
type: String
},
expdate: {
type: Date
},
clientcode: {
type: String
},
purpose: {
type: String
},
amount: {
type: Number
},
approved: {
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
const empexpenses=mongoose.model('empexpenses',empexpensesschema);

module.exports=empexpenses;

