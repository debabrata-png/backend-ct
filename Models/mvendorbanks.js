const mongoose=require('mongoose');

const mvendorbanksschema = new mongoose.Schema({
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
    vendorid: {
type: String
},
vendor: {
type: String
},
bank: {
type: String
},
account: {
type: String
},
accno: {
type: String
},
ifsc: {
type: String
},
branch: {
type: String
},
acctype: {
type: String
},
banktype: {
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
const mvendorbanks=mongoose.model('mvendorbanks',mvendorbanksschema);

module.exports=mvendorbanks;

