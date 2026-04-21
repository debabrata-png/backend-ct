const mongoose=require('mongoose');

const ngroupschema = new mongoose.Schema({
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
    group1: {
type: String
},
fuser: {
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
const ngroup=mongoose.model('ngroup',ngroupschema);

module.exports=ngroup;

