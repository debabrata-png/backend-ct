const mongoose=require('mongoose');

const syllabusprogschema = new mongoose.Schema({
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
    programcode: {
        type: String,
        required: [true,'Please enter program code'],
        unique: false
    },
    programname: {
        type: String,
        required: [true,'Please enter program name '],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter the department'],
        unique: false
    },
    yearofintro: {
        type: String,
        required: [true,'Please enter year of introduction'],
        unique: false
    },
    
    status: {
        type: String,
        required: [true,'Please enter status of syllabus revision'],
        unique: false
    },
    
    yearofrevision: {
        type: String,
        required: [true,'Please enter year of revision '],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter the document link '],
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
const ProgramwiseSyllabusRevision=mongoose.model('ProgramwiseSyllabusRevision',syllabusprogschema);

module.exports=ProgramwiseSyllabusRevision;

