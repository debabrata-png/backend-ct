const mongoose=require('mongoose');

const nucodeofethicsschema = new mongoose.Schema({
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
    statedcodeofethics: {
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
const nucodeofethics=mongoose.model('nucodeofethics',nucodeofethicsschema);

module.exports=nucodeofethics;

