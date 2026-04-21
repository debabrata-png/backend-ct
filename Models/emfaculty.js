const mongoose=require('mongoose');

const emfacultyschema = new mongoose.Schema({
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
    programname: {
type: String
},
programcode: {
type: String
},
faculty: {
type: String
},
year: {
type: String
},
noofhours: {
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
const emfaculty=mongoose.model('emfaculty',emfacultyschema);

module.exports=emfaculty;

