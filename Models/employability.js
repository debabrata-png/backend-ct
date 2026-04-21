const mongoose=require('mongoose');

const employabilityschema = new mongoose.Schema({
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
    coursename: {
        type: String,
        required: [true,'Please enter course name'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter course code'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter course year of introduction'],
        unique: false
    },
    activity: {
        type: String,
        required: [true,'Please enter activity name'],
        unique: false
    },
    description: {
        type: String,
        required: [true,'Please enter activity description'],
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
const Employability=mongoose.model('Employability',employabilityschema);

module.exports=Employability;

