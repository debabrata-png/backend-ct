const mongoose=require('mongoose');

const studmasternewschema = new mongoose.Schema({
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
programname: {
type: String
},
programcode: {
type: String
},
name: {
type: String
},
regno: {
type: String
},
admissionyear: {
type: String
},
semester: {
type: String
},
isfinalyear: {
type: String
},
repeat: {
type: String
},
gender: {
type: String
},
category1: {
type: String
},
category2: {
type: String
},
pwd: {
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
const studmasternew=mongoose.model('studmasternew',studmasternewschema);

module.exports=studmasternew;

