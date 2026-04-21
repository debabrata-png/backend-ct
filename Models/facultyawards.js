const mongoose=require('mongoose');

const facultyawardsschema = new mongoose.Schema({
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
    innovation: {
        type: String,
        required: [true,'Please enter name of the innovation'],
        unique: false
    },
    awardee: {
        type: String,
        required: [true,'Please enter name of awardee'],
        unique: false
    },
    agency: {
        type: String,
        required: [true,'Please enter agency with contact details'],
        unique: false
    },
    category: {
        type: String,
        required: [true,'Please enter type of category'],
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
const Facultyawards=mongoose.model('Facultyawards',facultyawardsschema);

module.exports=Facultyawards;

