const mongoose=require('mongoose');

const madmapplyaschema = new mongoose.Schema({
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
program: {
type: String
},
programcode: {
type: String
},
student: {
type: String
},
email: {
type: String
},
phone: {
type: String
},
gender: {
type: String
},
category: {
type: String
},
tenth: {
type: Number
},
twelveth: {
type: Number
},
major: {
type: Number
},
minor1: {
type: Number
},
minor2: {
type: Number
},
language: {
type: Number
},
board: {
type: String
},
ispwd: {
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
const madmapplya=mongoose.model('madmapplya',madmapplyaschema);

module.exports=madmapplya;

