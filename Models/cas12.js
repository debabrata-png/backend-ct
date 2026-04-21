const mongoose=require('mongoose');

const cas12schema = new mongoose.Schema({
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
    type: {
type: String
},
grade: {
type: String
},
score: {
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
const cas12=mongoose.model('cas12',cas12schema);

module.exports=cas12;

