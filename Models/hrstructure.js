const mongoose=require('mongoose');

const hrstructureschema = new mongoose.Schema({
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
    struture: {
type: String
},
description: {
type: String
},
businessrole: {
type: String
},
paycommission: {
type: String
},
designation: {
type: String
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
const hrstructure=mongoose.model('hrstructure',hrstructureschema);

module.exports=hrstructure;

