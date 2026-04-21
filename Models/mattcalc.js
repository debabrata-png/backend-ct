const mongoose=require('mongoose');

const mattcalcschema = new mongoose.Schema({
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
coursename: {
type: String
},
coursecode: {
type: String
},
faculty: {
type: String
},
co: {
type: String
},
component: {
type: String
},
marksp: {
type: Number
},
weightage: {
type: Number
},
percentage: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const mattcalc=mongoose.model('mattcalc',mattcalcschema);

module.exports=mattcalc;

