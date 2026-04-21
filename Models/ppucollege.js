const mongoose=require('mongoose');

const ppucollegeschema = new mongoose.Schema({
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
    clgname: {
type: String
},
clgadrs: {
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
const ppucollege=mongoose.model('ppucollege',ppucollegeschema);

module.exports=ppucollege;

