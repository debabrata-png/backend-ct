const mongoose=require('mongoose');

const nlufocusschema = new mongoose.Schema({
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
programname: {
type: String
},
coursename: {
type: String
},
focus: {
type: String
},
ifnew: {
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
const nlufocus=mongoose.model('nlufocus',nlufocusschema);

module.exports=nlufocus;

