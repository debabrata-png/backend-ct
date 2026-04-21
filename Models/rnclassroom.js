const mongoose=require('mongoose');

const rnclassroomschema = new mongoose.Schema({
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
classroomsize: {
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
const rnclassroom=mongoose.model('rnclassroom',rnclassroomschema);

module.exports=rnclassroom;

