const mongoose=require('mongoose');

const nfeedbckscoreschema = new mongoose.Schema({
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
    academicyear: {
type: String
},
month1: {
type: String
},
feedback: {
type: String
},
question: {
type: String
},
score: {
type: Number
},
student: {
type: String
},
regno: {
type: String
},
facultyid: {
type: String
},
infrastructureid: {
type: String
},
courseid: {
type: String
},
programid: {
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
const nfeedbckscore=mongoose.model('nfeedbckscore',nfeedbckscoreschema);

module.exports=nfeedbckscore;

