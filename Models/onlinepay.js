const mongoose=require('mongoose');

const onlinepayschema = new mongoose.Schema({
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
    transactionid: {
type: String
},
orderid: {
type: String
},
bankref: {
type: String
},
paymode: {
type: String
},
bank: {
type: String
},
amount: {
type: Number
},
username: {
type: String
},
regno: {
type: String
},
clientcolid: {
type: String
},
sessionslot: {
type: String
},
testc: {
type: String
},
type: {
type: String
},
paydate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const onlinepay=mongoose.model('onlinepay',onlinepayschema);

module.exports=onlinepay;

