const mongoose=require('mongoose');

const vacstudentsschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
year: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
admissionyear: {
type: String
},
ifcompleted: {
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
const vacstudents=mongoose.model('vacstudents',vacstudentsschema);

module.exports=vacstudents;

