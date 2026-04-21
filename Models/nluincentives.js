const mongoose=require('mongoose');

const nluincentivesschema = new mongoose.Schema({
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
    type: {
type: String
},
ifpresent: {
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
const nluincentives=mongoose.model('nluincentives',nluincentivesschema);

module.exports=nluincentives;

