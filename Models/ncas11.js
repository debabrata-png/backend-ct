const mongoose=require('mongoose');

const ncas11schema = new mongoose.Schema({
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
semester: {
type: String
},
noofclass: {
type: Number
},
totalclass: {
type: Number
},
percentage: {
type: Number
},
grade: {
type: String
},
score: {
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
const ncas11=mongoose.model('ncas11',ncas11schema);

module.exports=ncas11;

