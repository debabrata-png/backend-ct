const mongoose=require('mongoose');

const attendancenewschema = new mongoose.Schema({
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
classid: {
type: String
},
programcode: {
type: String
},
program: {
type: String
},
course: {
type: String
},
coursecode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
att: {
type: Number
},
classdate: {
type: Date
},
semester: {
type: String
},
section: {
type: String
},
type: {
type: String
},
reason: {
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
const attendancenew=mongoose.model('attendancenew',attendancenewschema);

module.exports=attendancenew;

