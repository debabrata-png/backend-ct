const mongoose=require('mongoose');

const stockregisterdsschema = new mongoose.Schema({
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
storename: {
type: String
},
storeid: {
type: String
},
itemname: {
type: String
},
itemcode: {
type: String
},
quantityadded: {
type: Number
},
quantityreturn: {
type: Number
},
netquantity: {
type: Number
},
tdate: {
type: Date
},
itemtype: {
type: String
},
status: {
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
const stockregisterds=mongoose.model('stockregisterds',stockregisterdsschema);

module.exports=stockregisterds;

