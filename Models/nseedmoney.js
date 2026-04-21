const mongoose=require('mongoose');

const nseedmoneyschema = new mongoose.Schema({
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
project: {
type: String
},
description: {
type: String
},
amount: {
type: Number
},
copi: {
type: String
},
department: {
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
const nseedmoney=mongoose.model('nseedmoney',nseedmoneyschema);

module.exports=nseedmoney;

