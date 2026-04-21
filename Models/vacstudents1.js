const mongoose=require('mongoose');

const vacstudents1schema = new mongoose.Schema({
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
    course: {
type: String
},
coursecode: {
type: String
},
year: {
type: String
},
student: {
type: String
},
regno: {
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
const vacstudents1=mongoose.model('vacstudents1',vacstudents1schema);

module.exports=vacstudents1;

