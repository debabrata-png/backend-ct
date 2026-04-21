const mongoose=require('mongoose');

const ninterschema = new mongoose.Schema({
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
totalprograms: {
type: Number
},
totalcourses: {
type: Number
},
interdisciplinary: {
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
const ninter=mongoose.model('ninter',ninterschema);

module.exports=ninter;

