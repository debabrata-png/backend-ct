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
    }
})
//
const User=mongoose.model('Users',userschema);

module.exports=User;

