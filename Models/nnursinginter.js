const mongoose=require('mongoose');

const nnursinginterschema = new mongoose.Schema({
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
programname: {
type: String
},
totalcourses: {
type: Number
},
department: {
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
const nnursinginter=mongoose.model('nnursinginter',nnursinginterschema);

module.exports=nnursinginter;

