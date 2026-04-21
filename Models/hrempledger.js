const mongoose=require('mongoose');

const hrempledgerschema = new mongoose.Schema({
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
employee: {
type: String
},
empid: {
type: String
},
role: {
type: String
},
designation: {
type: String
},
category: {
type: String
},
item: {
type: String
},
due: {
type: Number
},
concession: {
type: Number
},
paid: {
type: Number
},
balance: {
type: Number
},
paydate: {
type: Date
},
payref: {
type: String
},
cashbook: {
type: String
},
type: {
type: String
},
level: {
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
const hrempledger=mongoose.model('hrempledger',hrempledgerschema);

module.exports=hrempledger;

