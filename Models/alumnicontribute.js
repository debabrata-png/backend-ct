const mongoose=require('mongoose');

const alumnicontributeschema = new mongoose.Schema({
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
    amount: {
type: Number
},
purpose: {
type: String
},
refid: {
type: String
},
bank: {
type: String
},
tdate: {
type: Date
},
description: {
type: String
},
programname: {
type: String
},
batch: {
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
const alumnicontribute=mongoose.model('alumnicontribute',alumnicontributeschema);

module.exports=alumnicontribute;

