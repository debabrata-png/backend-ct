const mongoose=require('mongoose');

const nfeedbackschema = new mongoose.Schema({
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
    academicyear: {
type: String
},
month1: {
type: String
},
feedback: {
type: String
},
question: {
type: String
},
type: {
type: String
},
level: {
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
const nfeedback=mongoose.model('nfeedback',nfeedbackschema);

module.exports=nfeedback;

