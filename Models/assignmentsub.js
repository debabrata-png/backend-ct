const mongoose=require('mongoose');

const assignmentsubschema = new mongoose.Schema({
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
        required: [true,'Please enter year'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter program name '],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter course name'],
        unique: false
    },
    totalenr: {
        type: Number,
        required: [true,'Please enter total enrollment in the program'],
        unique: false
    },
    totalasgn: {
        type: Number,
        required: [true,'Please enter total no.of assignments per course'],
        unique: false
    },
    asgnsubmitted: {
        type: Number,
        required: [true,'Please enter no.of assignments submitted'],
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
const AssignnentSubmitted=mongoose.model('AssignnentSubmitted',assignmentsubschema);

module.exports=AssignnentSubmitted;

