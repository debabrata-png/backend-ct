const mongoose=require('mongoose');

const nuexplearningschema = new mongoose.Schema({
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
programname: {
type: String
},
programcode: {
    type: String
    },
noofstudents: {
    type: Number
},
coursename: {
type: String
},
coursecode: {
type: String
},
components: {
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
const nuexplearning=mongoose.model('nuexplearning',nuexplearningschema);

module.exports=nuexplearning;

