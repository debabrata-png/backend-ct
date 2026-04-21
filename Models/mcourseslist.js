const mongoose=require('mongoose');

const mcourseslistschema = new mongoose.Schema({
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
programcode: {
type: String
},
course: {
type: String
},
coursecode: {
type: String
},
type: {
type: String
},
semester: {
type: String
},
credit: {
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
const mcourseslist=mongoose.model('mcourseslist',mcourseslistschema);

module.exports=mcourseslist;

