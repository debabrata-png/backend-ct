const mongoose=require('mongoose');

const alumniconschema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: [true,'Please enter amount'],
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
const Alumnicontribution=mongoose.model('Alumnicontribution',alumniconschema);

module.exports=Alumnicontribution;

