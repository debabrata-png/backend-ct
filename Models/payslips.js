const mongoose=require('mongoose');

const payslipsschema = new mongoose.Schema({
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
month: {
type: String
},
netpay: {
type: Number
},
grosspay: {
type: Number
},
paydate: {
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
const payslips=mongoose.model('payslips',payslipsschema);

module.exports=payslips;

