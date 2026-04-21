const mongoose=require('mongoose');

const paufdetailsaschema = new mongoose.Schema({
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
    name: {
type: String
},
department: {
type: String
},
degrencrse: {
type: String
},
faculty: {
type: String
},
ifregular: {
type: String
},
image: {
type: String
},
designation: {
type: String
},
resadrs1: {
type: String
},
resadrs2: {
type: String
},
district: {
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
const paufdetailsa=mongoose.model('paufdetailsa',paufdetailsaschema);

module.exports=paufdetailsa;

