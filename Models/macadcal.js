const mongoose=require('mongoose');

const macadcalschema = new mongoose.Schema({
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
    academicyear: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
ativity: {
type: String
},
description: {
type: String
},
activitydate: {
type: Date
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
const macadcal=mongoose.model('macadcal',macadcalschema);

module.exports=macadcal;

