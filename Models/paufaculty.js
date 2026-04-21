const mongoose=require('mongoose');

const paufacultyschema = new mongoose.Schema({
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
    college: {
type: String
},
department: {
type: String
},
course: {
type: String
},
afcode: {
type: String
},
fname: {
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
const paufaculty=mongoose.model('paufaculty',paufacultyschema);

module.exports=paufaculty;

