const mongoose=require('mongoose');

const doc514submissionschema = new mongoose.Schema({
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
    grievance: {
type: String
},
mechanism: {
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
const doc514submission=mongoose.model('doc514submission',doc514submissionschema);

module.exports=doc514submission;

