const mongoose=require('mongoose');

const doc312financeschema = new mongoose.Schema({
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
mapping: {
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
const doc312finance=mongoose.model('doc312finance',doc312financeschema);

module.exports=doc312finance;

