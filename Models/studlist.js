const mongoose=require('mongoose');

const studlistschema = new mongoose.Schema({
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
department: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
students: {
type: Number
},
gender: {
type: String
},
category: {
type: String
},
type: {
type: String
},
level: {
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
const studlist=mongoose.model('studlist',studlistschema);

module.exports=studlist;

