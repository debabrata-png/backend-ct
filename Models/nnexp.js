const mongoose=require('mongoose');

const nnexpschema = new mongoose.Schema({
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
fieldvisit: {
type: Number
},
internship: {
type: Number
},
research: {
type: Number
},
industry: {
type: Number
},
posting: {
type: Number
},
total: {
type: Number
},
department: {
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
const nnexp=mongoose.model('nnexp',nnexpschema);

module.exports=nnexp;

