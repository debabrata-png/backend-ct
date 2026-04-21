const mongoose=require('mongoose');

const mtrialbalance1schema = new mongoose.Schema({
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
cogs: {
type: String
},
amount: {
type: Number
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
const mtrialbalance1=mongoose.model('mtrialbalance1',mtrialbalance1schema);

module.exports=mtrialbalance1;

