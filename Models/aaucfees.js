const mongoose=require('mongoose');

const aaucfeesschema = new mongoose.Schema({
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
draftno: {
type: String
},
draftdate: {
type: String
},
bank: {
type: String
},
purpose: {
type: String
},
amount: {
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
const aaucfees=mongoose.model('aaucfees',aaucfeesschema);

module.exports=aaucfees;

