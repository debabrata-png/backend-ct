const mongoose=require('mongoose');

const mpopaymentsschema = new mongoose.Schema({
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
poid: {
type: String
},
invoiceid: {
type: String
},
frombank: {
type: String
},
amount: {
type: Number
},
invoicedate: {
type: Date
},
paydate: {
type: Date
},
fromaccount: {
type: String
},
fromifsc: {
type: String
},
refno: {
type: String
},
tobank: {
type: String
},
toaccount: {
type: String
},
toifsc: {
type: String
},
paytype: {
type: String
},
doclink: {
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
const mpopayments=mongoose.model('mpopayments',mpopaymentsschema);

module.exports=mpopayments;

