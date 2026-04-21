const mongoose=require('mongoose');

const mjournal2schema = new mongoose.Schema({
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
accgroup: {
type: String
},
account: {
type: String
},
acctype: {
type: String
},
transaction: {
type: String
},
transactionref: {
type: String
},
subledger: {
type: String
},
cogs: {
type: String
},
activitydate: {
type: Date
},
amount: {
type: Number
},
credit: {
type: Number
},
debit: {
type: Number
},
type: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
empid: {
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
const mjournal2=mongoose.model('mjournal2',mjournal2schema);

module.exports=mjournal2;

