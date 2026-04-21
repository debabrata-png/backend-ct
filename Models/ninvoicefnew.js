const mongoose=require('mongoose');

const ninvoicefnewschema = new mongoose.Schema({
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
    orgid: {
type: String
},
orgname: {
type: String
},
invno: {
type: String
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
acholder: {
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
invstatus: {
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
const ninvoicefnew=mongoose.model('ninvoicefnew',ninvoicefnewschema);

module.exports=ninvoicefnew;

