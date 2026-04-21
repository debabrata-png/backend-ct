const mongoose=require('mongoose');

const doc346lmsschema = new mongoose.Schema({
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
faculty: {
type: String
},
lms: {
type: String
},
course: {
type: String
},
link: {
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
const doc346lms=mongoose.model('doc346lms',doc346lmsschema);

module.exports=doc346lms;

