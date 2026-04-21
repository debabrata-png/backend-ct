const mongoose=require('mongoose');

const ncas26schema = new mongoose.Schema({
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
type: {
type: String
},
level: {
type: String
},
score: {
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
const ncas26=mongoose.model('ncas26',ncas26schema);

module.exports=ncas26;

