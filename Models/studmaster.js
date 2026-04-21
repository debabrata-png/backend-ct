const mongoose=require('mongoose');

const studmasterschema = new mongoose.Schema({
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
programname: {
type: String
},
programcode: {
type: String
},
name: {
type: String
},
regno: {
type: String
},
admissionyear: {
type: String
},
semester: {
type: String
},
isfinalyear: {
type: String
},
repeat: {
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
const studmaster=mongoose.model('studmaster',studmasterschema);

module.exports=studmaster;

