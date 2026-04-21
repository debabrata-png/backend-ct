const mongoose=require('mongoose');

const tblapischema = new mongoose.Schema({
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
    tbl: {
type: String
},
activity: {
type: String
},
description: {
type: String
},
type: {
type: String
},
address: {
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
const tblapi=mongoose.model('tblapi',tblapischema);

module.exports=tblapi;

