const mongoose=require('mongoose');

const rsmuendowmentcngschema = new mongoose.Schema({
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
    createdwith: {
type: String
},
depointbank: {
type: String
},
branchname: {
type: String
},
amountrs: {
type: Number
},
program: {
type: String
},
instrument: {
type: Number
},
instrumentDate: {
type: Date
},
expirydate: {
type: Date
},
finanreserve: {
type: Number
},
manddexp: {
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
const rsmuendowmentcng=mongoose.model('rsmuendowmentcng',rsmuendowmentcngschema);

module.exports=rsmuendowmentcng;

