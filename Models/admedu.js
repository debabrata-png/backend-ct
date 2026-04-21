const mongoose=require('mongoose');

const admeduschema = new mongoose.Schema({
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
    level: {
type: String
},
institution: {
type: String
},
degree: {
type: String
},
marks: {
type: Number
},
grade: {
type: String
},
year: {
type: String
},
university: {
type: String
},
location: {
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
const admedu=mongoose.model('admedu',admeduschema);

module.exports=admedu;

