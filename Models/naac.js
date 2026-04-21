const mongoose=require('mongoose');

const naacschema = new mongoose.Schema({
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
    criteriano: {
        type: String,
        required: [true,'Please enter criteria numbr'],
        unique: false
    },
    criteria: {
        type: String,
        required: [true,'Please enter criteria name'],
        unique: false
    },
    subcriteria: {
        type: String,
        required: [true,'Please enter sub criteria name'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter Link to view page'],
        unique: false
    
    }
})
//
const NaacColleges=mongoose.model('NaacColleges',naacschema);

module.exports=NaacColleges;

