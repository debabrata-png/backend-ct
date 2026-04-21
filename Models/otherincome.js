const mongoose=require('mongoose');

const otherincomeschema = new mongoose.Schema({
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
account: {
type: String
},
agency: {
type: String
},
transaction: {
type: String
},
amount: {
type: Number
},
transactiondate: {
type: Date
},
type: {
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
const otherincome=mongoose.model('otherincome',otherincomeschema);

module.exports=otherincome;

