const mongoose=require('mongoose');

const ncompetitiveschema = new mongoose.Schema({
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
scheme: {
type: String
},
studentsparticipated: {
type: Number
},
totalstudents: {
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
const ncompetitive=mongoose.model('ncompetitive',ncompetitiveschema);

module.exports=ncompetitive;

