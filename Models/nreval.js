const mongoose=require('mongoose');

const nrevalschema = new mongoose.Schema({
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
singlereval: {
type: Number
},
doubleretotal: {
type: Number
},
doublereval: {
type: Number
},
answerscript: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nreval=mongoose.model('nreval',nrevalschema);

module.exports=nreval;

