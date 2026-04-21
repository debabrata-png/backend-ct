const mongoose=require('mongoose');

const pauconfaccourseschema = new mongoose.Schema({
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
    degree: {
type: String
},
course: {
type: String
},
totsanc: {
type: Number
},
itype: {
type: String
},
req: {
type: Number
},
avail: {
type: Number
},
deficiency: {
type: Number
},
cdeficient: {
type: Number
},
ssr: {
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
const pauconfaccourse=mongoose.model('pauconfaccourse',pauconfaccourseschema);

module.exports=pauconfaccourse;

