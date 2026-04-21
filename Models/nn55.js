const mongoose=require('mongoose');

const nn55schema = new mongoose.Schema({
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
total: {
type: Number
},
slow: {
type: Number
},
advanced: {
type: Number
},
diverse: {
type: Number
},
doclink: {
type: String
},
type: {
type: String
},
level: {
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
const nn55=mongoose.model('nn55',nn55schema);

module.exports=nn55;

