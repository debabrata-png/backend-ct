const mongoose=require('mongoose');

const patentschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    patentnumber: {
        type: String,
        required: [true,'Please enter journal'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    doa: {
        type: Date
    },
    agency: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    doclink: {
        type: String
    },
    patentstatus: {
        type: String
    },
    
    yop: {
        type: String,
        required: [true,'Please enter year of publication'],
        unique: false
    }
})
//
const Patent=mongoose.model('Patent',patentschema);

module.exports=Patent;

