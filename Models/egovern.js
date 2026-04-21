const mongoose=require('mongoose');

const egovernschema = new mongoose.Schema({
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
    egovernareas: {
        type: String,
        required: [true,'Please enter areas of e goevrnance'],
        unique: false
    },
    yearofimplement: {
        type: String,
        required: [true,'Please enter year of implementation'],
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
const Egovernance=mongoose.model('Egovernance',egovernschema);

module.exports=Egovernance;

