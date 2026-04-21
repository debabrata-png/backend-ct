const mongoose=require('mongoose');

const ncommitteesschema = new mongoose.Schema({
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
    fromyear: {
type: String
},
committee: {
type: String
},
description: {
type: String
},
members: {
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
const ncommittees=mongoose.model('ncommittees',ncommitteesschema);

module.exports=ncommittees;

