const mongoose=require('mongoose');

const nn14schema = new mongoose.Schema({
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
year: {
type: String
},
projects: {
type: String
},
internship: {
type: String
},
studproj: {
type: Number
},
studintern: {
type: Number
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
const nn14=mongoose.model('nn14',nn14schema);

module.exports=nn14;

