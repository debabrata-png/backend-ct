const mongoose=require('mongoose');

const rsmubankacntsschema = new mongoose.Schema({
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
    name: {
type: String
},
accountype: {
type: String
},
bankname: {
type: String
},
branch: {
type: String
},
accountno: {
type: Number
},
isfc: {
type: String
},
lastbalance: {
type: Number
},
lastacademic: {
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
const rsmubankacnts=mongoose.model('rsmubankacnts',rsmubankacntsschema);

module.exports=rsmubankacnts;

