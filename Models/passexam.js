const mongoose=require('mongoose');

const passexamschema = new mongoose.Schema({
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
    studyyear: {
        type: String
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
    
    studappear: {
        type: String,
        required: [true,'Please enter number of students appeared in final exam'],
        unique: false
    },
    studpass: {
        type: String,
        required: [true,'Please enter number of students passed in final exam'],
        unique: false
    },
    backlog: {
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
const Studentpassingexam=mongoose.model('Studentpassingexam',passexamschema);

module.exports=Studentpassingexam;

