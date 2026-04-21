const mongoose=require('mongoose');

const pauconfacsheschema = new mongoose.Schema({
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
    designation: {
type: String
},
course: {
type: String
},
nooffac: {
type: Number
},
intake: {
type: Number
},
reqfac: {
type: Number
},
deficiency: {
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
const pauconfacshe=mongoose.model('pauconfacshe',pauconfacsheschema);

module.exports=pauconfacshe;

