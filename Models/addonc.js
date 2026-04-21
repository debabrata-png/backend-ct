const mongoose=require('mongoose');

const addoncschema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: [true,'Please enter price']
    },
    status: {
        type: Number,
        required: [true,'Please enter status']
    },
    coursetitle: {
        type: String,
        required: [true,'Please enter course title'],
        unique: false
    },
    imagelink: {
        type: String,
        required: [true,'Please enter imagelink'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter course code'],
        unique: false
    },
    coursetype: {
        type: String,
        required: [true,'Please enter course type'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year of offering'],
        unique: false
    },
    offeredtimes: {
        type: String,
        required: [true,'Please enter the number of times offered in the same year'],
        unique: false
    },
    duration: {
        type: String,
        required: [true,'Please enter the duration of course'],
        unique: false
    },
    category: {
        type: String,
        required: [true,'Please enter the course category'],
        unique: false
    },
    studentsenrolled: {
        type: String,
        required: [true,'Please enter the number of students enrolled'],
        unique: false
    },
    department: {
        type: String
    },
    coursehours: {
        type: Number
    },
    totalstudents: {
        type: Number
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    dateadded: {
        type: Date,
        default: Date.now
    },
    studentscompleted: {
        type: String,
        required: [true,'Please enter the number of students completing the course'],
        unique: false
    }
})
//
const AddOnCourse=mongoose.model('AddOnCourse',addoncschema);

module.exports=AddOnCourse;

