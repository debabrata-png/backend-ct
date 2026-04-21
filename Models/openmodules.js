const mongoose=require('mongoose');

const openmodulesschema = new mongoose.Schema({
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
    coursecode: {
type: String
},
module: {
type: String
},
description: {
type: String
},
link: {
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
const openmodules=mongoose.model('openmodules',openmodulesschema);

module.exports=openmodules;

