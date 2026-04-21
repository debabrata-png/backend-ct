const mongoose=require('mongoose');

const studentpubsschema = new mongoose.Schema({
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
    publication: {
        type: String
    },
    student: {
        type: String
    },
    regno: {
        type: String
    },
    academicyear: {
        type: String
    },
    award: {
        type: String
    },
    agency: {
        type: String
    },
    department: {
        type: String
    },
    programname: {
        type: String
    },
    programcode: {
        type: String
    },
    comments: {
        type: String
    },
    status1: {
        type: String
    }
})
//
const Studentpubs=mongoose.model('Studentpubs',studentpubsschema);

module.exports=Studentpubs;

