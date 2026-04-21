const mongoose=require('mongoose');

const innovationnewschema = new mongoose.Schema({
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
    department: {
type: String
},
year: {
type: String
},
title: {
type: String
},
awardee: {
type: String
},
agency: {
type: String
},
category: {
type: String
},
designation: {
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
const innovationnew=mongoose.model('innovationnew',innovationnewschema);

module.exports=innovationnew;

