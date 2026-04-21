const mongoose=require('mongoose');

const nn16schema = new mongoose.Schema({
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
programcode: {
type: String
},
year: {
type: String
},
mooc: {
type: String
},
guestl: {
type: String
},
onlinec: {
type: String
},
offlinec: {
type: String
},
type: {
type: String
},
level: {
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
const nn16=mongoose.model('nn16',nn16schema);

module.exports=nn16;

