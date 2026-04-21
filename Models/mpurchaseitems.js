const mongoose=require('mongoose');

const mpurchaseitemsschema = new mongoose.Schema({
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
    poid: {
type: String
},
item: {
type: String
},
description: {
type: String
},
amount: {
type: Number
},
gst: {
type: Number
},
purchasetype: {
type: String
},
category: {
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
const mpurchaseitems=mongoose.model('mpurchaseitems',mpurchaseitemsschema);

module.exports=mpurchaseitems;

