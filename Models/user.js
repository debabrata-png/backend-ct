const mongoose=require('mongoose');

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please enter email'],
        unique: true
    },
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    phone: {
        type: String,
        required: [true,'Please enter phone']
    },
    password: {
        type: String,
        required: [true,'Please enter password']
    },
    role: {
        type: String,
        required: [true,'Please enter role']
    },
    regno: {
        type: String,
        required: [true,'Please enter regno']
    },
    programcode: {
        type: String,
        required: [true,'Please enter program code']
    },
    admissionyear: {
        type: String,
        required: [true,'Please enter admission year']
    },
    semester: {
        type: String,
        required: [true,'Please enter semester']
    },
    section: {
        type: String,
        required: [true,'Please enter section']
    },
    gender: {
        type: String
    },
    department: {
        type: String,
        required: [true,'Please enter role']
    },
    photo: {
        type: String
    },
    expotoken: {
        type: String
    },
    category: {
        type: String
    },
    address: {
        type: String
    },
    quota: {
        type: String
    },
    user: {
        type: String
    },
    addedby: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    lastlogin: {
        type: Date
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: Number,
        required: [true,'Please enter status']
    },
    fathername: {
        type: String
    },
    mothername: {
        type: String
    },
    dob: {
        type: String
    },
    eligibilityname: {
        type: String
    },
    srno: {
        type: Number
    },
    degree: {
        type: String
    },
    minorsub: {
        type: String
    },
    vocationalsub: {
        type: String
    },
    mdcsub: {
        type: String
    },
    othersub:{
        type: String
    }, // other subjects means PW/AP/CE Subjects
    merit: {
        type: String
    },
    obtain: {
        type:Number
    },
    bonus: {
        type: Number
    },
    weightage: {
        type: Number
    },
    ncctype: {
        type: String
    },
    isdisabled: {
        type: String
    },
    scholarship:{
        type: String
    }
})
//
const User=mongoose.model('Users',userschema);

module.exports=User;

