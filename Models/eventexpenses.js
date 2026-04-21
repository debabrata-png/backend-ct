const mongoose=require('mongoose');

const eventexpensesschema = new mongoose.Schema({
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
eventcode: {
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
const eventexpenses=mongoose.model('eventexpenses',eventexpensesschema);

module.exports=eventexpenses;

