const mongoose=require('mongoose');

const nhighereducationschema = new mongoose.Schema({
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
institute: {
type: String
},
targetprogram: {
type: String
},
program: {
type: String
},
student: {
type: String
},
department: {
type: String
},
regno: {
type: String
},
studentcontact: {
type: String
},
selectiondate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nhighereducation=mongoose.model('nhighereducation',nhighereducationschema);

module.exports=nhighereducation;

