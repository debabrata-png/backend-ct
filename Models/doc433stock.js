const mongoose=require('mongoose');

const doc433stockschema = new mongoose.Schema({
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
const doc433stock=mongoose.model('doc433stock',doc433stockschema);

module.exports=doc433stock;

