const mongoose=require('mongoose');

const rmsunirfschema = new mongoose.Schema({
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
    academicyear: {
type: String
},
type: {
type: String
},
grade: {
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
const rmsunirf=mongoose.model('rmsunirf',rmsunirfschema);

module.exports=rmsunirf;

