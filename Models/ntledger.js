const mongoose=require('mongoose');

const ntledgerschema = new mongoose.Schema({
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
transaction: {
type: String
},
amount: {
type: Number
},
type: {
type: String
},
transactiondate: {
type: Date
},
transactionid: {
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
const ntledger=mongoose.model('ntledger',ntledgerschema);

module.exports=ntledger;

