const mongoose=require('mongoose');

const ainscomschema = new mongoose.Schema({
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
    designation: {
type: String
},
name: {
type: String
},
profposition: {
type: String
},
department: {
type: String
},
institution: {
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
const ainscom=mongoose.model('ainscom',ainscomschema);

module.exports=ainscom;

