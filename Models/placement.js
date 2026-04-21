const mongoose=require('mongoose');

const placementschema = new mongoose.Schema({
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
    studentname: {
        type: String,
        required: [true,'Please enter name of students placed'],
        unique: false
    },
    studcontactdetails: {
        type: Number,
        required: [true,'Please enter contact details of students placed'],
        unique: false
    },
    programname: {
        type: String,
        required: [true,'Please enter name of program graduated from'],
        unique: false
    },
    programcode: {
        type: String
    },
    regno: {
        type: String
    },
    sector: {
        type: String
    },
    designation: {
        type: String
    },
    employerid: {
        type: String
    },
    jobid: {
        type: String
    },
    empaddress: {
        type: String
    },
    employername: {
        type: String,
        required: [true,'Please enter name of employer'],
        unique: false
    },
    empcontactdetails: {
        type: Number,
        required: [true,'Please enter contact details of employer'],
        unique: false
    },
    salary: {
        type: Number,
        required: [true,'Please enter pay pacakage at appoinment(in INR/annum)'],
        unique: false
   
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
const Placement=mongoose.model('Placement',placementschema);

module.exports=Placement;

