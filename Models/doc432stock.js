const mongoose=require('mongoose');

const doc432stockschema = new mongoose.Schema({
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
type: {
type: String
},
buydate: {
type: Date
},
department: {
type: String
},
assetcode: {
type: String
},
description: {
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
const doc432stock=mongoose.model('doc432stock',doc432stockschema);

module.exports=doc432stock;

