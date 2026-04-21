const mongoose=require('mongoose');

const ctrainingschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    consultant: {
        type: String,
        required: [true,'Please enter consultant name '],
        unique: false
    },
    department: {
        type: String
    },
    title: {
        type: String
    },
    agency: {
        type: String,
        required: [true,'Please enter agency name'],
        unique: false
    },
    revenue: {
        type: Number,
        required: [true,'Please enter the revenue '],
        unique: false
    },
    role: {
        type: String
    },
    nooftrainees: {
        type: Number
    },
    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const Ctraining=mongoose.model('Ctraining',ctrainingschema);

module.exports=Ctraining;

