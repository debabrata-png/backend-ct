const mongoose=require('mongoose');

const salarypaidschema = new mongoose.Schema({
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
    employee: {
type: String
},
userid: {
type: String
},
item: {
type: String
},
amount: {
type: Number
},
datepaid: {
type: Date
},
type: {
type: String
},
bank: {
type: String
},
refno: {
type: String
},
account: {
type: String
},
accountno: {
type: String
},
frombank: {
type: String
},
fromaccount: {
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
const salarypaid=mongoose.model('salarypaid',salarypaidschema);

module.exports=salarypaid;

