const mongoose=require('mongoose');

const pubaqarschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    booktitle: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    papertitle: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    proceeding: {
        type: String,
        required: [true,'Please enter journal'],
        unique: false
    },
    conference: {
        type: String,
        required: [true,'Please enter conference'],
        unique: false
    },
    level: {
        type: String,
        required: [true,'Please enter level'],
        unique: false
    },
    yop: {
        type: String,
        required: [true,'Please enter year of publication'],
        unique: false
    },
    issn: {
        type: String,
        required: [true,'Please enter issn'],
        unique: false
    },
    publisher: {
        type: String,
        required: [true,'Please enter publisher'],
        unique: false
    },
    status1: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    },
    comments: {
        type: String,
        required: [true,'Please enter comments'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    affiliated: {
        type: String,
        required: [true,'Please enter name of affiliated institute'],
        unique: false
    }
})
//
const Pubaqar=mongoose.model('Pubaqar',pubaqarschema);

module.exports=Pubaqar;

