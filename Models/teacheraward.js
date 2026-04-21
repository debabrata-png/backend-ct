const mongoose=require('mongoose');

const teacherawardschema = new mongoose.Schema({
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
    tname: {
        type: String,
        required: [true,'Please enter name of full time faculty'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year of award'],
        unique: false
    },
    pan: {
        type: String,
        required: [true,'Please enter pan details'],
        unique: false
    },
    designation: {
        type: String,
        required: [true,'Please enter faculty designation'],
        unique: false
    },
    
    award: {
        type: String,
        required: [true,'Please enter award name'],
        unique: false
    },
    
    agency: {
        type: String,
        required: [true,'Please enter awarding agency name '],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type of incentives given'],
        unique: false
    },
    amount: {
        type: Number,
        required: [true,'Please enter incentive amount '],
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
const Teacherawards=mongoose.model('Teacherawards',teacherawardschema);

module.exports=Teacherawards;

