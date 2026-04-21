const mongoose=require('mongoose');

const ppucompsoftwareschema = new mongoose.Schema({
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
    software: {
type: String
},
typeoflicense: {
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
const ppucompsoftware=mongoose.model('ppucompsoftware',ppucompsoftwareschema);

module.exports=ppucompsoftware;

