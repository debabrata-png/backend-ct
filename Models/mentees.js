const mongoose=require('mongoose');

const menteesschema = new mongoose.Schema({
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
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter academic year '],
        unique: false
    },
    mentor: {
        type: String,
        required: [true,'Please enter mentor name'],
        unique: false
    },
    
    noofmentee: {
        type: Number,
        required: [true,'Please enter no.of mentees '],
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
const Mentee=mongoose.model('Mentee',menteesschema);

module.exports=Mentee;

