const mongoose=require('mongoose');

const cfilesschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name'],
        unique: false
    },
    user: {
        type: String,
        required: [true,'Please enter user']
    },
    filename: {
        type: String,
        required: [true,'Please enter filename'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: Number,
        required: [true,'Please enter status']
    }
})
//
const Cfiles=mongoose.model('Cfiles',cfilesschema);

module.exports=Cfiles;

