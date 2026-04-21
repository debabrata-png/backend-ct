const mongoose=require('mongoose');

const mediaschema = new mongoose.Schema({
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
    department: {
        type: String,
        required: [true,'Please enter department '],
        unique: false
    },
    programname: {
        type: String,
        required: [true,'Please enter the programname'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter the program code'],
        unique: false
    },
    media: { 
        type: String,
        required: [true,'Please enter type of media'],
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
const Media=mongoose.model('Media',mediaschema);

module.exports=Media;

