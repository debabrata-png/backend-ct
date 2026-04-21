const mongoose=require('mongoose');

const btrialbschema = new mongoose.Schema({
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
accounting: {
type: String
},
amount: {
type: Number
},
nature: {
type: String
},
purpose: {
type: String
},
department: {
type: String
},
bank: {
type: String
},
ledgerref: {
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
const btrialb=mongoose.model('btrialb',btrialbschema);

module.exports=btrialb;

