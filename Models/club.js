const mongoose=require('mongoose');

const clubschema = new mongoose.Schema({
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
    
    clubname: {
        type: String,
        required: [true,'Please enter name of the club'],
        unique: false
    },
    description: {
        type: String,
        required: [true,'Please enter club description'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter image link'],
        unique: false
    },
    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    }
})
//
const Club=mongoose.model('Club',clubschema);

module.exports=Club;

