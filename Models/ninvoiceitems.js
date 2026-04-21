const mongoose=require('mongoose');

const ninvoiceitemsschema = new mongoose.Schema({
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
    invoiceid: {
type: String
},
item: {
type: String
},
hsnsac: {
type: String
},
sale: {
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
samestate: {
type: String
},
total: {
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
const ninvoiceitems=mongoose.model('ninvoiceitems',ninvoiceitemsschema);

module.exports=ninvoiceitems;

