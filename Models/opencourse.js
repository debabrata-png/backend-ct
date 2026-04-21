const mongoose=require('mongoose');

const opencourseschema = new mongoose.Schema({
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
coursecode: {
type: String
},
coursename: {
type: String
},
startdate: {
type: Date
},
price: {
type: Number
},
description: {
type: String
},
skills: {
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
const opencourse=mongoose.model('opencourse',opencourseschema);

module.exports=opencourse;

