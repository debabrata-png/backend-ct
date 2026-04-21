const mongoose=require('mongoose');

const ppuaddprogschema = new mongoose.Schema({
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
    degree: {
type: String
},
progname: {
type: String
},
sancstrngth: {
type: Number
},
recgnodate: {
type: String
},
remarks: {
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
const ppuaddprog=mongoose.model('ppuaddprog',ppuaddprogschema);

module.exports=ppuaddprog;

