const mongoose=require('mongoose');

const paunfaddqualifschema = new mongoose.Schema({
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
    faculty: {
type: String
},
email: {
type: String
},
score: {
type: String
},
file: {
type: String
},
title: {
type: Number
},
fphdaward: {
type: String
},
yoe: {
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
const paunfaddqualif=mongoose.model('paunfaddqualif',paunfaddqualifschema);

module.exports=paunfaddqualif;

