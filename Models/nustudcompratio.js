const mongoose=require('mongoose');

const nustudcompratioschema = new mongoose.Schema({
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
    noofstudents: {
type: Number
},
noofcomputers: {
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
const nustudcompratio=mongoose.model('nustudcompratio',nustudcompratioschema);

module.exports=nustudcompratio;

