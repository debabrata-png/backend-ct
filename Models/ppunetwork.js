const mongoose=require('mongoose');

const ppunetworkschema = new mongoose.Schema({
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
    bandwidth: {
type: String
},
noofterm: {
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
const ppunetwork=mongoose.model('ppunetwork',ppunetworkschema);

module.exports=ppunetwork;

