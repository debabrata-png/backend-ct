const mongoose=require('mongoose');

const expenditurenewschema = new mongoose.Schema({
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
acchead: {
    type: String
},
expitem: {
    type: String
},
salary: {
    type: Number
},
allother: {
    type: Number
},
totalexp: {
type: Number
},
budget: {
type: Number
},
infraexp: {
type: Number
},
booksexp: {
type: Number
},
physicalexp: {
type: Number
},
academicexp: {
type: Number
},
otherexp: {
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
const expenditurenew=mongoose.model('expenditurenew',expenditurenewschema);

module.exports=expenditurenew;

