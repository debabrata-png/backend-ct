const mongoose=require('mongoose');

const admmarksschema = new mongoose.Schema({
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
    degree: {
type: String
},
subject: {
type: String
},
type: {
type: String
},
marks: {
type: Number
},
grade: {
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
const admmarks=mongoose.model('admmarks',admmarksschema);

module.exports=admmarks;

