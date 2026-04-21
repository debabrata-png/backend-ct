const mongoose=require('mongoose');

const ninvoicenewschema = new mongoose.Schema({
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
gst: {
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
const ninvoicenew=mongoose.model('ninvoicenew',ninvoicenewschema);

module.exports=ninvoicenew;

