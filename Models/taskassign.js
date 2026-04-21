const mongoose=require('mongoose');

const taskassignschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    assignedtoname: {
        type: String,
        required: [true,'Please enter assigned to name']
    },
    assignedtouser: {
        type: String,
        required: [true,'Please enter assigned to user'],
        unique: false
    },
    instructions: {
        type: String
    },
    comments: {
        type: String
    },
    documentlink: {
        type: String
    },
    classdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    classtime: {
        type: String,
        required: [true,'Please enter time'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    taskid: {
        type: String,
        required: [true,'Please enter taskid'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Taskassign=mongoose.model('Taskassign',taskassignschema);

module.exports=Taskassign;

