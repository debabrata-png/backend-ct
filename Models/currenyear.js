const mongoose=require('mongoose');

const currenyearschema = new mongoose.Schema({
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
year: {
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
const currenyear=mongoose.model('currenyear',currenyearschema);

module.exports=currenyear;

