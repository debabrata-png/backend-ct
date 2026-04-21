const mongoose=require('mongoose');

const pauaddcrseschema = new mongoose.Schema({
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
admtintake: {
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
const pauaddcrse=mongoose.model('pauaddcrse',pauaddcrseschema);

module.exports=pauaddcrse;

