const mongoose=require('mongoose');

const invoiceschema = new mongoose.Schema({
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
    client: {
        type: String
    },
    clientid: {
        type: String,
    },
    cgst: {
        type: Number,
    },
    sgst: {
        type: Number,
    },
    igst: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
    },
    duedate: {
        type: Date,
    },
    createdon: {
        type: Date,
    },
    clientgst: {
        type: String,
    },
    clientaddress: {
        type: String,
    },
    receiveddate: {
        type: Date,
    },
    bank: {
        type: String,
    },
    accountnumber: {
        type: String,
    },
    amountreceived: {
        type: String,
    }
})
//
const Invoice=mongoose.model('Invoice',invoiceschema);

module.exports=Invoice;

