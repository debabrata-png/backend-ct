const mongoose=require('mongoose');

const tasksschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    category: {
        type: String
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    documentlink: {
        type: String,
        required: [true,'Please enter link of document link'],
        unique: false
    },
    classdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    startdate: {
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
    academicyear: {
        type: String,
        required: [true,'Please enter academicyear'],
        unique: false
    },
    topic: {
        type: String,
        required: [true,'Please enter topic'],
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
    },
    group: {
        type: String
    },
    criteria: {
        type: String
    },
    metric: {
        type: String
    },
    intervention: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const Tasks=mongoose.model('Tasks',tasksschema);

module.exports=Tasks;

