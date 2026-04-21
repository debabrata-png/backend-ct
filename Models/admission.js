const mongoose=require('mongoose');

const admissionschema = new mongoose.Schema({
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
    programname: {
        type: String,
        required: [true,'Please enter program name'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter program code'],
        unique: false
    },
    sancseat: {
        type: String,
        required: [true,'Please enter number of sanctioned seats'],
        unique: false
    },
    studapply: {
        type: String,
        required: [true,'Please enter number of applications received'],
        unique: false
    },
    studadmt: {
        type: String,
        required: [true,'Please enter number of students admitted'],
        unique: false
    },
    lateral: {
        type: Number
    },
    sepdevision: {
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
const StudentAdmission=mongoose.model('StudentAdmission',admissionschema);

module.exports=StudentAdmission;

