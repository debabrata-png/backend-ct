const mongoose=require('mongoose');

const teacherfsschema = new mongoose.Schema({
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
    tname: {
        type: String,
        required: [true,'Please enter faculty name'],
        unique: false
    },
    workshop: {
        type: String,
        required: [true,'Please enter name of the workshop/conference attended'],
        unique: false
    },
    profbody: {
        type: String,
        required: [true,'Please enter the name of professional body'],
        unique: false
    },
    amount: {
        type: Number,
        required: [true,'Please enter amount received(in INR)'],
        unique: false
    },
    source: {
        type: String
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
const TeacherFinancialSupport=mongoose.model('TeacherFinancialSupport',teacherfsschema);

module.exports=TeacherFinancialSupport;

