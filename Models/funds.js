const mongoose=require('mongoose');

const fundsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    department: {
        type: String
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
    agency: {
        type: String,
        required: [true,'Please enter name of funding agency/individual'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type of body'],
        unique: false
    },
    purpose: {
        type: String,
        required: [true,'Please enter purpose of the grant'],
        unique: false
    },
    amount: {
        type: Number,
        required: [true,'Please enter funds/grants received(INR in lakhs)'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link to audited satements'],
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
const Funds=mongoose.model('Funds',fundsschema);

module.exports=Funds;

