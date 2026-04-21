const mongoose=require('mongoose');

const amlibraryschema = new mongoose.Schema({
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
    engbooks: {
type: Number
},
tamilbooks: {
type: Number
},
otherbooks: {
type: Number
},
engjournal: {
type: Number
},
tamiljournal: {
type: Number
},
otherjournal: {
type: Number
},
engnews: {
type: Number
},
tamilnews: {
type: Number
},
othernews: {
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
const amlibrary=mongoose.model('amlibrary',amlibraryschema);

module.exports=amlibrary;

