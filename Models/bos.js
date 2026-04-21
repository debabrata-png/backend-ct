const mongoose=require('mongoose');

const bosschema = new mongoose.Schema({
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
    
    fname: {
        type: String,
        required: [true,'Please enter name of the faculty engaging in academic bodies'],
        unique: false
    },
    
    academicbody: {
        type: String,
        required: [true,'Please enter name of the academic body'],
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
const AcademicBody=mongoose.model('AcademicBody',bosschema);

module.exports=AcademicBody;

