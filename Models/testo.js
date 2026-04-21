const mongoose=require('mongoose');

const testoschema = new mongoose.Schema({
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
    testid: {
type: String
},
questionid: {
type: String
},
option: {
type: String
},
score: {
type: Number
},
imagelink: {
type: String
},
videolink: {
type: String
},
doclink: {
type: String
},
type: {
type: String
},
difficulty: {
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
const testo=mongoose.model('testo',testoschema);

module.exports=testo;

