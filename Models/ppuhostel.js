const mongoose=require('mongoose');

const ppuhostelschema = new mongoose.Schema({
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
    type: {
type: String
},
noofblocks: {
type: Number
},
location: {
type: String
},
noofstaff: {
type: Number
},
noofcomroom: {
type: Number
},
noofreadroom: {
type: Number
},
noofrecroom: {
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
const ppuhostel=mongoose.model('ppuhostel',ppuhostelschema);

module.exports=ppuhostel;

