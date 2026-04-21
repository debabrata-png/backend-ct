const mongoose=require('mongoose');

const skilldevschema = new mongoose.Schema({
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
    programname: {
        type: String,
        required: [true,'Please enter name of the skill development program'],
        unique: false
    },
    date: {
        type: Date,
        required: [true,'Please enter date of implementation'],
        unique: false
    },
    noofstudenr: {
        type: Number,
        required: [true,'Please enter number of students enrolled'],
        unique: false
    },
    agency: {
        type: String,
        required: [true,'Please enter name of agency/consultants'],
        unique: false
    },
    contactdetails: {
        type: String,
        required: [true,'Please enter contact details of agency/consultants'],
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
const SkillDevelopment=mongoose.model('SkillDevelopment',skilldevschema);

module.exports=SkillDevelopment;

