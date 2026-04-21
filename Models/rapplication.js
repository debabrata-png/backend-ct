const mongoose=require('mongoose');

const rapplicationschema = new mongoose.Schema({
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
type: {
type: String
},
course: {
type: String
},
college: {
type: String
},
society: {
type: String
},
principal: {
type: String
},
principalmob: {
type: Number
},
email: {
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
const rapplication=mongoose.model('rapplication',rapplicationschema);

module.exports=rapplication;

