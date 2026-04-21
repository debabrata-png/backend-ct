const mongoose=require('mongoose');

const pausoftwareschema = new mongoose.Schema({
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
    softreq: {
type: String
},
availsoft: {
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
const pausoftware=mongoose.model('pausoftware',pausoftwareschema);

module.exports=pausoftware;

