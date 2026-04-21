const mongoose=require('mongoose');

const paubankacntsschema = new mongoose.Schema({
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
    acctype: {
type: String
},
bank: {
type: String
},
branch: {
type: String
},
accno: {
type: String
},
ifsccode: {
type: String
},
baleol: {
type: String
},
bal: {
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
const paubankacnts=mongoose.model('paubankacnts',paubankacntsschema);

module.exports=paubankacnts;

