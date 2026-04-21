const mongoose=require('mongoose');

const pauothamenschema = new mongoose.Schema({
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
    amen: {
type: String
},
avail: {
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
const pauothamen=mongoose.model('pauothamen',pauothamenschema);

module.exports=pauothamen;

