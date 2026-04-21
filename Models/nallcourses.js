const mongoose=require('mongoose');

const nallcoursesschema = new mongoose.Schema({
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
    department: {
type: String
},
introductionyear: {
type: String
},
discontinueyear: {
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
documentlink: {
    type: String
    },
coursetype: {
type: String
},
lecture: {
type: Number
},
theory: {
type: Number
},
practical: {
type: Number
},
total: {
type: Number
},
credits: {
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
const nallcourses=mongoose.model('nallcourses',nallcoursesschema);

module.exports=nallcourses;

