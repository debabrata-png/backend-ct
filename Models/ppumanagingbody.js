const mongoose=require('mongoose');

const ppumanagingbodyschema = new mongoose.Schema({
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
    bodyname: {
type: String
},
address: {
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
const ppumanagingbody=mongoose.model('ppumanagingbody',ppumanagingbodyschema);

module.exports=ppumanagingbody;

