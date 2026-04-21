const mongoose=require('mongoose');

const pauinstcourseschema = new mongoose.Schema({
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
    instname: {
type: String
},
ug: {
type: Number
},
pg: {
type: Number
},
total: {
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
const pauinstcourse=mongoose.model('pauinstcourse',pauinstcourseschema);

module.exports=pauinstcourse;

