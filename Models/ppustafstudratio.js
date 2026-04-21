const mongoose=require('mongoose');

const ppustafstudratioschema = new mongoose.Schema({
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
    department: {
type: String
},
program: {
type: String
},
sancstrength: {
type: Number
},
totalstaff: {
type: Number
},
ratio: {
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
const ppustafstudratio=mongoose.model('ppustafstudratio',ppustafstudratioschema);

module.exports=ppustafstudratio;

