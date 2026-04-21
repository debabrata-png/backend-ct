const mongoose=require('mongoose');

const massignsubmitschema = new mongoose.Schema({
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
assignmentid: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
description: {
type: String
},
submitdate: {
type: Date
},
doclink: {
type: String
},
ascomments: {
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
const massignsubmit=mongoose.model('massignsubmit',massignsubmitschema);

module.exports=massignsubmit;

