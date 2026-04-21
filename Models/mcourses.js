const mongoose=require('mongoose');

const mcoursesschema = new mongoose.Schema({
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
const mcourses=mongoose.model('mcourses',mcoursesschema);

module.exports=mcourses;

