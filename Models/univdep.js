const mongoose=require('mongoose');

const univdepschema = new mongoose.Schema({
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
    campus: {
type: String
},
faculty: {
type: String
},
department: {
type: String
},
description: {
type: String
},
address: {
type: String
},
hod: {
type: String
},
hodemail: {
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
const univdep=mongoose.model('univdep',univdepschema);

module.exports=univdep;

