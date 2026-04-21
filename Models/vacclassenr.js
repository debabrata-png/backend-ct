const mongoose=require('mongoose');

const vacclassenrschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    regdate: {
        type: Date,
        required: [true,'Please enter reg date'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    student: {
        type: String,
        required: [true,'Please enter student'],
        unique: false
    },
    studentemail: {
        type: String,
        required: [true,'Please enter student email'],
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
    academicyear: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Vacclassenr=mongoose.model('Vacclassenr',vacclassenrschema);

module.exports=Vacclassenr;

