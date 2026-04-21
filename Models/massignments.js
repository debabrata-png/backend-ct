const mongoose=require('mongoose');

const massignmentsschema = new mongoose.Schema({
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
course: {
type: String
},
coursecode: {
type: String
},
assignment: {
type: String
},
description: {
type: String
},
duedate: {
type: Date
},
type: {
type: String
},
methodology: {
type: String
},
learning: {
type: String
},
doclink: {
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
const massignments=mongoose.model('massignments',massignmentsschema);

module.exports=massignments;

