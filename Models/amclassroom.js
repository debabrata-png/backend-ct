const mongoose=require('mongoose');

const amclassroomschema = new mongoose.Schema({
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
    code: {
type: String
},
carpetarea: {
type: Number
},
allotment: {
type: String
},
rooftype: {
type: String
},
furniture: {
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
const amclassroom=mongoose.model('amclassroom',amclassroomschema);

module.exports=amclassroom;

