const mongoose=require('mongoose');

const aaucn2schema = new mongoose.Schema({
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
type: {
type: String
},
requested: {
type: Number
},
applied: {
type: String
},
medium: {
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
const aaucn2=mongoose.model('aaucn2',aaucn2schema);

module.exports=aaucn2;

