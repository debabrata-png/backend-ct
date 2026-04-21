const mongoose=require('mongoose');

const mpurchaseschema = new mongoose.Schema({
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
ponumber: {
type: String
},
podate: {
type: Date
},
description: {
type: String
},
vendorid: {
type: String
},
vendor: {
type: String
},
amount: {
type: Number
},
gst: {
type: Number
},
terms: {
type: String
},
potype: {
type: String
},
approval: {
type: String
},
approvaluser: {
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
const mpurchase=mongoose.model('mpurchase',mpurchaseschema);

module.exports=mpurchase;

