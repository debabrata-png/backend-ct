const mongoose=require('mongoose');

const ncomtasksschema = new mongoose.Schema({
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
task: {
type: String
},
description: {
type: String
},
startdate: {
type: Date
},
targetdate: {
type: Date
},
enddate: {
type: Date
},
status: {
type: String
},
owner: {
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
const ncomtasks=mongoose.model('ncomtasks',ncomtasksschema);

module.exports=ncomtasks;

