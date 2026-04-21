const mongoose=require('mongoose');

const attendschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    regno: {
        type: String,
        required: [true,'Please enter regno']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    programcode: {
        type: String
    },
    program: {
        type: String
    },
    year: {
        type: String
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    classid: {
        type: String,
        required: [true,'Please enter classid'],
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
const Attend=mongoose.model('Attend',attendschema);

module.exports=Attend;

