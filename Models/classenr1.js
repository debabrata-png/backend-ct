const mongoose=require('mongoose');

const classenr1schema = new mongoose.Schema({
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
student: {
type: String
},
regno: {
type: String
},
learning: {
type: String
},
gender: {
type: String
},
classgroup: {
type: String
},
coursetype: {
type: String
},
semester: {
type: String
},
active: {
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
const classenr1=mongoose.model('classenr1',classenr1schema);

module.exports=classenr1;

