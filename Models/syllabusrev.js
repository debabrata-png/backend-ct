const mongoose=require('mongoose');

const syllabusrevschema = new mongoose.Schema({
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
        required: [true,'Please enter program name'],
        unique: false
    },
    yearofintro: {
        type: String,
        required: [true,'Please enter year of introduction'],
        unique: false
    },
    statusofimplement: {
        type: String,
        required: [true,'Please enter status of implementation'],
        unique: false
    },
    yearofimplement: {
        type: String,
        required: [true,'Please enter year of implementation of cbcs'],
        unique: false

    },
    yearofrevision: {
        type: String,
        required: [true,'Please enter year of syllabus revision'],
        unique: false

    },
    changepercent: {
        type: String,
        required: [true,'Please enter year of implementation of cbcs'],
        unique: false

    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    datastatus: {
        type: String,
        required: [true,'Please enter status of data'],
        unique: false

    },
    comment: {
        type: String,
        required: [true,'Please enter your comments'],
        unique: false

    }
})
//
const SyllabusRevision=mongoose.model('SyllabusRevision',syllabusrevschema);

module.exports=SyllabusRevision;

