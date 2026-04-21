const mongoose=require('mongoose');

const cas11schema = new mongoose.Schema({
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
const cas11=mongoose.model('cas11',cas11schema);

module.exports=cas11;

