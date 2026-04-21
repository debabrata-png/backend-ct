const mongoose=require('mongoose');

const cbcsschema = new mongoose.Schema({
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
    programcode: {
        type: String,
        required: [true,'Please enter program code'],
        unique: false
    },
    programname: {
        type: String,
        required: [true,'Please enter program name'],
        unique: false
    },
    yearofintro: {
        type: String,
        required: [true,'Please enter year of introduction'],
        unique: false
    },
    statusofimplement: {
        type: String,
        required: [true,'Please enter status of implementation'],
        unique: false
    },
    yearofimplement: {
        type: String,
        required: [true,'Please enter year of implementation of cbcs'],
        unique: false

    },
    link: {
        type: String,
        required: [true,'Please enter link'],
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
const Cbcs=mongoose.model('Cbcs',cbcsschema);

module.exports=Cbcs;

