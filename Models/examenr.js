const mongoose=require('mongoose');

const examenrschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    examcode: {
        type: String,
        required: [true,'Please enter coursecode'],
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
    proctoremail: {
        type: String
    },
    proctorlink: {
        type: String
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
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
const Examenr=mongoose.model('Examenr',examenrschema);

module.exports=Examenr;

