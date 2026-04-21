const mongoose=require('mongoose');

const nassistantreqschema = new mongoose.Schema({
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
item: {
type: String
},
description: {
type: String
},
noofpeople: {
type: Number
},
amount: {
type: Number
},
startdate: {
type: Date
},
enddate: {
type: Date
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
const nassistantreq=mongoose.model('nassistantreq',nassistantreqschema);

module.exports=nassistantreq;

