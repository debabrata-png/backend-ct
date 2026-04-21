const mongoose=require('mongoose');

const examschema = new mongoose.Schema({
    academicyear: {
        type: String,
        required: [true,'Please enter academic year']
    },
    examname: {
        type: String,
        required: [true,'Please enter exam name']
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
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    proctorlink: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    section: {
        type: String,
        required: [true,'Please enter section'],
        unique: false
    },
    classdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    enddate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter classtime'],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter course'],
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
const Exam=mongoose.model('Exam',examschema);

module.exports=Exam;

