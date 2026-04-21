const mongoose=require('mongoose');

const nvinvoiceschema = new mongoose.Schema({
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
vendor: {
type: String
},
workorder: {
type: String
},
workorderid: {
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
invoiceid: {
type: String
},
duedate: {
type: Date
},
actualdate: {
type: Date
},
paidamount: {
type: Number
},
bank: {
type: String
},
refno: {
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
const nvinvoice=mongoose.model('nvinvoice',nvinvoiceschema);

module.exports=nvinvoice;

