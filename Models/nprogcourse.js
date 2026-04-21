const mongoose=require('mongoose');

const nprogcourseschema = new mongoose.Schema({
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
programcode: {
type: String
},
programname: {
type: String
},
coursecode: {
type: String
},
course: {
type: String
},
focus: {
    type: String
},
ifintroduced: {
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
const nprogcourse=mongoose.model('nprogcourse',nprogcourseschema);

module.exports=nprogcourse;

