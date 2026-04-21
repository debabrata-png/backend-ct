const mongoose=require('mongoose');

const circularfacschema = new mongoose.Schema({
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
    department: {
        type: String
    },
    title: {
        type: String,
        required: [true,'Please enter Title'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter Link'],
        unique: false
    },
    role: {
        type: String
    },
    description: {
        type: String,
        required: [true,'Please enter the Description'],
        unique: false
    },
    status1: {
        type: String
    }
})
//
const Circularfac=mongoose.model('Circularfac',circularfacschema);

module.exports=Circularfac;

