const mongoose=require('mongoose');

const prisonersschema = new mongoose.Schema({
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
    prisoners: {
        type: Number,
        required: [true,'Please enter no.of prisoners learners '],
        unique: false
    },
    total: {
        type: Number,
        required: [true,'Please enter total no. of learners'],
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
const PrisonerLearners=mongoose.model('PrisonerLearners',prisonersschema);

module.exports=PrisonerLearners;

