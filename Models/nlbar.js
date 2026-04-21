const mongoose=require('mongoose');

const nlbarschema = new mongoose.Schema({
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
studentname: {
type: String
},
program: {
type: String
},
council: {
type: String
},
enrolmentno: {
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
const nlbar=mongoose.model('nlbar',nlbarschema);

module.exports=nlbar;

