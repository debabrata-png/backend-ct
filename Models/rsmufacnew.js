const mongoose=require('mongoose');

const rsmufacnewschema = new mongoose.Schema({
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
    program: {
type: String
},
sex: {
type: String
},
grossPay: {
type: Number
},
dep_name: {
type: String
},
fact_name: {
type: String
},
add1: {
type: String
},
add2: {
type: String
},
dist: {
type: String
},
mob_num: {
type: Number
},
email: {
type: String
},
community: {
type: String
},
pan_no: {
type: Number
},
pass_no: {
type: Number
},
aadh_no: {
type: Number
},
dob: {
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
const rsmufacnew=mongoose.model('rsmufacnew',rsmufacnewschema);

module.exports=rsmufacnew;

