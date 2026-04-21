const mongoose=require('mongoose');

const rmsucoldetaschema = new mongoose.Schema({
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
    col_name: {
type: String
},
address: {
type: String
},
pincode: {
type: Number
},
estab_year: {
type: Number
},
instu_type: {
type: String
},
instu_type_code: {
type: String
},
isInsti_auto: {
type: String
},
isInsti_approved: {
type: String
},
ref: {
type: String
},
minority: {
type: String
},
tele_no: {
type: Number
},
mob_no: {
type: Number
},
fax_no: {
type: Number
},
email: {
type: String
},
web_add: {
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
const rmsucoldeta=mongoose.model('rmsucoldeta',rmsucoldetaschema);

module.exports=rmsucoldeta;

