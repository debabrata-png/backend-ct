const mongoose=require('mongoose');

const padmnewschema = new mongoose.Schema({
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
sanctioned: {
type: Number
},
firstyear: {
type: Number
},
secondyear: {
type: Number
},
thirdyear: {
type: Number
},
fourthyear: {
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
const padmnew=mongoose.model('padmnew',padmnewschema);

module.exports=padmnew;

