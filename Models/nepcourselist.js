const mongoose=require('mongoose');

const nepcourseschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter course'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    credits: {
        type: Number,
        required: [true,'Please enter credits']
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    dateofintroduction: {
        type: Date,
        required: [true,'Please enter date of introduction']
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Nepcourse=mongoose.model('Nepcourse',nepcourseschema);

module.exports=Nepcourse;

