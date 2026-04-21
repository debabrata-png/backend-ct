const mongoose=require('mongoose');

const mtestsections1schema = new mongoose.Schema({
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
    testid: {
type: String
},
section: {
type: String
},
description: {
type: String
},
noofquestions: {
type: Number
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
const mtestsections1=mongoose.model('mtestsections1',mtestsections1schema);

module.exports=mtestsections1;

