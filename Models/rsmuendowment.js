const mongoose=require('mongoose');

const rsmuendowmentschema = new mongoose.Schema({
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
amount: {
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
const rsmuendowment=mongoose.model('rsmuendowment',rsmuendowmentschema);

module.exports=rsmuendowment;

