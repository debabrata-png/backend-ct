const mongoose=require('mongoose');

const employedschema = new mongoose.Schema({
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
    employed: {
        type: Number,
        required: [true,'Please enter no.of employed learners '],
        unique: false
    },
    notemployed: {
        type: Number,
        required: [true,'Please enter no.of non employed learners'],
        unique: false
    },
    total: {
        type: Number,
        required: [true,'Please enter total no.of learners'],
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
const EmployedLearners=mongoose.model('EmployedLearners',employedschema);

module.exports=EmployedLearners;

