const mongoose=require('mongoose');

const payslipdetailsschema = new mongoose.Schema({
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
    payslipid: {
type: String
},
year: {
type: String
},
month: {
type: String
},
item: {
type: String
},
type: {
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
const payslipdetails=mongoose.model('payslipdetails',payslipdetailsschema);

module.exports=payslipdetails;

