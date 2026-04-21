const mongoose=require('mongoose');

const tblemitterschema = new mongoose.Schema({
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
    title: {
type: String
},
emode: {
type: String
},
description: {
type: String
},
isactive: {
type: String
},
domain: {
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
const tblemitter=mongoose.model('tblemitter',tblemitterschema);

module.exports=tblemitter;

