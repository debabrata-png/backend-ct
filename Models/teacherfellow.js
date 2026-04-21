const mongoose=require('mongoose');

const teacherfellowschema = new mongoose.Schema({
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
        required: [true,'Please enter year of award'],
        unique: false
    },
    tname: {
        type: String,
        required: [true,'Please enter name of faculty'],
        unique: false
    },
    award: {
        type: String,
        required: [true,'Please enter name of the award/fellowship'],
        unique: false
    },
    agency: {
        type: String,
        required: [true,'Please enter awarding agency name'],
        unique: false
    },
    advanced: {
        type: String
    },
    duration: {
        type: String
    },
    amount: {
        type: Number
    },
    level: {
        type: String
    },
    doclink: {
        type: String
    },
    amount: {
        type: Number
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
const TeacherFellow=mongoose.model('TeacherFellow',teacherfellowschema);

module.exports=TeacherFellow;

