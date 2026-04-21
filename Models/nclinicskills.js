const mongoose=require('mongoose');

const nclinicskillsschema = new mongoose.Schema({
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
    facility: {
type: String
},
status: {
type: String
},
factraining: {
type: Number
},
studtraining: {
type: Number
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
const nclinicskills=mongoose.model('nclinicskills',nclinicskillsschema);

module.exports=nclinicskills;

