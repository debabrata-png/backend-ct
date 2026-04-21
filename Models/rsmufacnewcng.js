const mongoose=require('mongoose');

const rsmufacnewcngschema = new mongoose.Schema({
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
grosspay: {
type: Number
},
depname: {
type: String
},
factname: {
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
mobnum: {
type: Number
},
email: {
type: String
},
community: {
type: String
},
panno: {
type: Number
},
passno: {
type: Number
},
aadhno: {
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
const rsmufacnewcng=mongoose.model('rsmufacnewcng',rsmufacnewcngschema);

module.exports=rsmufacnewcng;

