const mongoose=require('mongoose');

const ppucompaddinfoschema = new mongoose.Schema({
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
    ifupdates: {
type: String
},
ifaddcomp: {
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
const ppucompaddinfo=mongoose.model('ppucompaddinfo',ppucompaddinfoschema);

module.exports=ppucompaddinfo;

