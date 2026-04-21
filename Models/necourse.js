const mongoose=require('mongoose');

const necourseschema = new mongoose.Schema({
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
noofteachers: {
type: Number
},
faculty: {
type: String
},
courselink: {
type: String
},
department: {
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
const necourse=mongoose.model('necourse',necourseschema);

module.exports=necourse;

