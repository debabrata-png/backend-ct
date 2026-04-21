const mongoose=require('mongoose');

const seedmschema = new mongoose.Schema({
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
        required: [true,'Please enter academic year'],
        unique: false
    },
    fname: {
        type: String,
        required: [true,'Please enter name of the faculty'],
        unique: false
    },
    project: {
        type: String
    },
    duration: {
        type: String
    },
    dateofgrant: {
        type: Date
    },
    programname: {
        type: String
    },
    programcode: {
        type: String
    },
    amount: {
        type: Number,
        required: [true,'Please enter amount of money received'],
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
const SeedMoney=mongoose.model('SeedMoney',seedmschema);

module.exports=SeedMoney;

