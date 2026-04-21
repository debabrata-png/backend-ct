const mongoose=require('mongoose');

const researchfellowschema = new mongoose.Schema({
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
    fellowname: {
        type: String,
        required: [true,'Please enter name of research fellow'],
        unique: false
    },
    duration: {
        type: String,
        required: [true,'Please enter the duration'],
        unique: false
    },
    agency: {
        type: String,
        required: [true,'Please enter agency name'],
        unique: false
    },
    
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    
    exam: {
        type: String,
        required: [true,'Please enter the name of qualifying exam '],
        unique: false
    },

    projectid: {
        type: String
    },

    project: {
        type: String
    },
    projectuser: {
        type: String
    },
    projectfaculty: {
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
const ResearchFellow=mongoose.model('ResearchFellow',researchfellowschema);

module.exports=ResearchFellow;

