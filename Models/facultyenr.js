const mongoose=require('mongoose');

const facultyenrschema = new mongoose.Schema({
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
    examcode: {
        type: String,
        required: [true,'Please enter examcode'],
        unique: false
    },
    examname: {
        type: String,
        required: [true,'Please enter exam name'],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter course'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter program'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter student regno'],
        unique: false
    },
    faculty: {
        type: String,
        required: [true,'Please enter faculty name'],
        unique: false
    },
    email: {
        type: String,
        required: [true,'Please enter faculty email'],
        unique: false
    },
    
    academicyear: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Facultyenr=mongoose.model('Facultyenr',facultyenrschema);

module.exports=Facultyenr;

