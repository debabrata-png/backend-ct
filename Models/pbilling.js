const mongoose=require('mongoose');

const pbillingschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
admid: {
type: String
},
billdate: {
type: Date
},
description: {
type: String
},
amount: {
type: String
},
payref: {
type: String
},
paystatus: {
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
const pbilling=mongoose.model('pbilling',pbillingschema);

module.exports=pbilling;

