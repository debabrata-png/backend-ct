const mongoose=require('mongoose');

const ppustudfacischema = new mongoose.Schema({
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
ifavlboys: {
type: String
},
ifavlgirls: {
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
const ppustudfaci=mongoose.model('ppustudfaci',ppustudfacischema);

module.exports=ppustudfaci;

