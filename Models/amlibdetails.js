const mongoose=require('mongoose');

const amlibdetailsschema = new mongoose.Schema({
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
author: {
type: String
},
publisher: {
type: String
},
type: {
type: String
},
language: {
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
const amlibdetails=mongoose.model('amlibdetails',amlibdetailsschema);

module.exports=amlibdetails;

