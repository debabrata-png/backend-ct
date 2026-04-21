const mongoose=require('mongoose');

const ppuotherfacischema = new mongoose.Schema({
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
details: {
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
const ppuotherfaci=mongoose.model('ppuotherfaci',ppuotherfacischema);

module.exports=ppuotherfaci;

