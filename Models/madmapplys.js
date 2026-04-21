const mongoose=require('mongoose');

const madmapplysschema = new mongoose.Schema({
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
physics: {
type: Number
},
chemistry: {
type: Number
},
maths: {
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
const madmapplys=mongoose.model('madmapplys',madmapplysschema);

module.exports=madmapplys;

