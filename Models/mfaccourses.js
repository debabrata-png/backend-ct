const mongoose=require('mongoose');

const mfaccoursesschema = new mongoose.Schema({
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
coursename: {
type: String
},
coursecode: {
type: String
},
type: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
semester: {
type: String
},
hours: {
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
const mfaccourses=mongoose.model('mfaccourses',mfaccoursesschema);

module.exports=mfaccourses;

