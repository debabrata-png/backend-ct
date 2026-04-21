const mongoose=require('mongoose');

const workloadn1schema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
semester: {
type: String
},
section: {
type: String
},
faculty: {
type: String
},
facultyid: {
type: String
},
course: {
type: String
},
coursecode: {
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
const workloadn1=mongoose.model('workloadn1',workloadn1schema);

module.exports=workloadn1;

