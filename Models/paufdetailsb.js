const mongoose=require('mongoose');

const paufdetailsbschema = new mongoose.Schema({
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
    phone: {
type: Number
},
mobile: {
type: Number
},
email: {
type: String
},
gender: {
type: String
},
community: {
type: String
},
pan: {
type: String
},
passport: {
type: String
},
adhar: {
type: String
},
fcodecoe: {
type: String
},
fcodeaicte: {
type: String
},
dob: {
type: Date
},
age: {
type: Number
},
payscale: {
type: Number
},
basicpay: {
type: Number
},
emoluments: {
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
const paufdetailsb=mongoose.model('paufdetailsb',paufdetailsbschema);

module.exports=paufdetailsb;

