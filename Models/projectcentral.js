const mongoose=require('mongoose');

const projectcentralschema = new mongoose.Schema({
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
department: {
type: String
},
project: {
type: String
},
faculty: {
type: String
},
fundingagency: {
type: String
},
transaction: {
type: String
},
account: {
type: String
},
amountreceived: {
type: Number
},
amountspent: {
type: Number
},
transactiondate: {
type: Date
},
category: {
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
const projectcentral=mongoose.model('projectcentral',projectcentralschema);

module.exports=projectcentral;

