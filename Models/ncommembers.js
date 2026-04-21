const mongoose=require('mongoose');

const ncommembersschema = new mongoose.Schema({
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
    committee: {
type: String
},
committeeid: {
type: String
},
member: {
type: String
},
username: {
type: String
},
memberfrom: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const ncommembers=mongoose.model('ncommembers',ncommembersschema);

module.exports=ncommembers;

