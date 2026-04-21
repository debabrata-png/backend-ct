const mongoose=require('mongoose');

const alumnipayschema = new mongoose.Schema({
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
    amount: {
type: Number
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
source: {
type: String
},
sourcedetails: {
type: String
},
purpose: {
type: String
},
type: {
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
const alumnipay=mongoose.model('alumnipay',alumnipayschema);

module.exports=alumnipay;

