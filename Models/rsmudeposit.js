const mongoose=require('mongoose');

const rsmudepositschema = new mongoose.Schema({
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
    deposits: {
type: String
},
holderName: {
type: String
},
intiName: {
type: String
},
brancg: {
type: String
},
refno: {
type: Number 
},
amount: {
type: Number 
},
maturityDate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const rsmudeposit=mongoose.model('rsmudeposit',rsmudepositschema);

module.exports=rsmudeposit;

