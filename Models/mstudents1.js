const mongoose=require('mongoose');

const mstudents1schema = new mongoose.Schema({
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
    student: {
type: String
},
regno: {
type: String
},
rollno: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
batch: {
type: String
},
year: {
type: String
},
gender: {
type: String
},
category: {
type: String
},
pwd: {
type: String
},
minority: {
type: String
},
currentyear: {
type: String
},
currentsem: {
type: String
},
username: {
type: String
},
password: {
type: String
},
enabled: {
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
const mstudents1=mongoose.model('mstudents1',mstudents1schema);

module.exports=mstudents1;

