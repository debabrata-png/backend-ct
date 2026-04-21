const mongoose=require('mongoose');

const allbanksschema = new mongoose.Schema({
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
    bank: {
type: String
},
account: {
type: String
},
accountno: {
type: String
},
ifsc: {
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
const allbanks=mongoose.model('allbanks',allbanksschema);

module.exports=allbanks;

