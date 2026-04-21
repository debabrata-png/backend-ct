const mongoose=require('mongoose');

const examautomationschema = new mongoose.Schema({
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
        required: [true,'Please enter academic year'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type/module automated'],
        unique: false
    },
    status: {
        type: String,
        required: [true,'Please enter status of automation'],
        unique: false
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
const Examautomation=mongoose.model('Examautomation',examautomationschema);

module.exports=Examautomation;

