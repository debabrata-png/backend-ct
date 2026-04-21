const mongoose=require('mongoose');

const exammarksallschema = new mongoose.Schema({
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
    exam: {
type: String
},
examcode: {
type: String
},
academicyear: {
type: String
},
student: {
type: String
},
regno: {
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
iafull: {
type: Number
},
iamarks: {
type: Number
},
eafull: {
type: Number
},
eamarks: {
type: Number
},
totalfull: {
type: Number
},
totalmarks: {
type: Number
},
totalp: {
type: Number
},
egrade: {
type: String
},
semester: {
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
const exammarksall=mongoose.model('exammarksall',exammarksallschema);

module.exports=exammarksall;

