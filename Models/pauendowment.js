const mongoose=require('mongoose');

const pauendowmentschema = new mongoose.Schema({
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
    created: {
type: String
},
bank: {
type: String
},
branch: {
type: String
},
amount: {
type: String
},
instrumentno: {
type: String
},
instrumentdate: {
type: Date
},
expdate: {
type: Date
},
finreserve: {
type: String
},
expenditure: {
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
const pauendowment=mongoose.model('pauendowment',pauendowmentschema);

module.exports=pauendowment;

