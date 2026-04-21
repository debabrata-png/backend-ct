const mongoose=require('mongoose');

const impactschema = new mongoose.Schema({
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
    sdg: {
        type: String,
        required: [true,'Please enter sdg'],
        unique: false
    },
    question: {
        type: String,
        required: [true,'Please enter question'],
        unique: false
    },
    answer: {
        type: String,
        required: [true,'Please enter answer'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    
    }
})
//
const ImpactRanking=mongoose.model('ImpactRanking',impactschema);

module.exports=ImpactRanking;

