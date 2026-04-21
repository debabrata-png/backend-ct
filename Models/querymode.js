const mongoose=require('mongoose');

const querymodeschema = new mongoose.Schema({
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
    type: {
        type: String,
        required: [true,'Please enter type of approach '],
        unique: false
    },
    received: {
        type: Number,
        required: [true,'Please enter the no.of queries received'],
        unique: false
    },
    resolved: {
        type: Number,
        required: [true,'Please enter no.of queries addresed'],
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
const QueryMode=mongoose.model('QueryMode',querymodeschema);

module.exports=QueryMode;

