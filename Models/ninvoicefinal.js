const mongoose=require('mongoose');

const ninvoicefinalschema = new mongoose.Schema({
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
    clientid: {
type: String
},
client: {
type: String
},
amount: {
type: Number
},
cgst: {
type: Number
},
sgst: {
type: Number
},
igst: {
type: Number
},
total: {
type: Number
},
duedate: {
type: Date
},
bank: {
type: String
},
account: {
type: String
},
ifsc: {
type: String
},
paybank: {
type: String
},
paydate: {
type: Date
},
refno: {
type: String
},
mode: {
type: String
},
received: {
type: Number
},
tds: {
type: Number
},
project: {
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
const ninvoicefinal=mongoose.model('ninvoicefinal',ninvoicefinalschema);

module.exports=ninvoicefinal;

