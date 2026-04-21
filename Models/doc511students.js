const mongoose=require('mongoose');

const doc511studentsschema = new mongoose.Schema({
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
scholarship: {
type: String
},
type: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
amount: {
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
const doc511students=mongoose.model('doc511students',doc511studentsschema);

module.exports=doc511students;

