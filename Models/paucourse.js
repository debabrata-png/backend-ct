const mongoose=require('mongoose');

const paucourseschema = new mongoose.Schema({
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
    department: {
type: String
},
degree: {
type: String
},
course: {
type: String
},
yoi: {
type: String
},
afflnature: {
type: String
},
fromdate: {
type: Date
},
todate: {
type: Date
},
letterno: {
type: String
},
letterdt: {
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
const paucourse=mongoose.model('paucourse',paucourseschema);

module.exports=paucourse;

