const mongoose=require('mongoose');

const curstructureschema = new mongoose.Schema({
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
    programcode: {
        type: String
    },
    course: {
        type: String
    },
    coursecode: {
        type: String
    },
    academicyear: {
        type: String
    },
    lecture: {
        type: Number
    },
    theory: {
        type: Number
    },
    practical: {
        type: Number
    },
    total: {
        type: Number
    },
    credits: {
        type: Number
    },
    department: {
        type: String
    },
    program: {
        type: String
    },
    comments: {
        type: String
    },
    status1: {
        type: String
    }
})
//
const Curstructure=mongoose.model('Curstructure',curstructureschema);

module.exports=Curstructure;

