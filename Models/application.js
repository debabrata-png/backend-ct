const mongoose=require('mongoose');

const applicationchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: [true,'Please enter address']
    },
    previousregno: {
        type: String,
        required: [true,'Please enter previousregno']
    },
    programcode: {
        type: String,
        required: [true,'Please enter program code']
    },
    admissionyear: {
        type: String,
        required: [true,'Please enter admission year']
    },
    parent: {
        type: String,
        required: [true,'Enter parent name']
    },
    occupation: {
        type: String,
        required: [true,'Enter parent occupation']
    },
    parentphone: {
        type: String,
        required: [true,'Enter parent phone']
    },
    guardian: {
        type: String,
        required: [true,'Enter guardian']
    },
    guardianphone: {
        type: String,
        required: [true,'Enter guardian phone']
    },
    photo: {
        type: String
    },
    dateofbirth: {
        type: Date
    },
    marrital: {
        type: String
    },
    religion: {
        type: String
    },
    caste: {
        type: String
    },
    category: {
        type: String
    },
    regno: {
        type: String
    },
    lastexam: {
        type: String
    },
    board: {
        type: String
    },
    reservedcategory: {
        type: String
    },
    percentagemarks: {
        type: Number
    },
    subject1: {
        type: String
    },
    sub1marks: {
        type: Number
    },
    subject2: {
        type: String
    },
    sub2marks: {
        type: Number
    },
    subject3: {
        type: String
    },
    sub3marks: {
        type: Number
    },
    subject4: {
        type: String
    },
    sub4marks: {
        type: Number
    },
    subject5: {
        type: String
    },
    sub5marks: {
        type: Number
    },
    subject6: {
        type: String
    },
    sub6marks: {
        type: Number
    },
    bloodgroup: {
        type: String
    },
    capid: {
        type: String
    },
    refno: {
        type: String
    },
    language1: {
        type: String
    },
    language2: {
        type: String
    },
    aadhar: {
        type: String
    },
    hostelrequired: {
        type: String
    },
    transportation: {
        type: String
    },
    source: {
        type: String
    },
    annualincome: {
        type: Number
    },
    lastlogin: {
        type: Date
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String,
        required: [true,'Please enter status']
    }
})
//
const Application=mongoose.model('Application',applicationchema);

module.exports=Application;

