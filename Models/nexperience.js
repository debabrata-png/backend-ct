const mongoose=require('mongoose');

const nexperienceschema = new mongoose.Schema({
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
    position: {
type: String
},
institution: {
type: String
},
fromdate: {
type: Date
},
todate: {
type: Date
},
totalexperience: {
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
const nexperience=mongoose.model('nexperience',nexperienceschema);

module.exports=nexperience;

