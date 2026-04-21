const mongoose=require('mongoose');

const ppustaffschema = new mongoose.Schema({
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
noofstaff: {
type: Number
},
area: {
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
const ppustaff=mongoose.model('ppustaff',ppustaffschema);

module.exports=ppustaff;

