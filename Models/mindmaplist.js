const mongoose=require('mongoose');

const mindmaplistschema = new mongoose.Schema({
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
description: {
type: String
},
coursecode: {
type: String
},
type1: {
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
const mindmaplist=mongoose.model('mindmaplist',mindmaplistschema);

module.exports=mindmaplist;

