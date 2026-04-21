const mongoose=require('mongoose');

const pauinstdetailsschema = new mongoose.Schema({
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
    instcode: {
type: String
},
instname: {
type: String
},
courseid: {
type: String
},
coursetype: {
type: String
},
crsename: {
type: String
},
degree: {
type: String
},
yos: {
type: String
},
firstyi: {
type: Number
},
secondyi: {
type: Number
},
thirdyi: {
type: Number
},
fourthyi: {
type: Number
},
fifthyi: {
type: Number
},
totalintk: {
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
const pauinstdetails=mongoose.model('pauinstdetails',pauinstdetailsschema);

module.exports=pauinstdetails;

