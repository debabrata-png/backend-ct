const mongoose=require('mongoose');

const ainsmasterschema = new mongoose.Schema({
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
insname: {
type: String
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
fifthyear: {
type: Number
},
total: {
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
const ainsmaster=mongoose.model('ainsmaster',ainsmasterschema);

module.exports=ainsmaster;

