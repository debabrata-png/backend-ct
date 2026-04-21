const mongoose=require('mongoose');

const dod211intakeschema = new mongoose.Schema({
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
type: String
},
program: {
type: String
},
programcode: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const dod211intake=mongoose.model('dod211intake',dod211intakeschema);

module.exports=dod211intake;

