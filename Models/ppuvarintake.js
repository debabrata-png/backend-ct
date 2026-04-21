const mongoose=require('mongoose');

const ppuvarintakeschema = new mongoose.Schema({
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
prevsancstrngth: {
type: Number
},
revsancstrngth: {
type: Number
},
noc: {
type: String
},
recgnodate: {
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
const ppuvarintake=mongoose.model('ppuvarintake',ppuvarintakeschema);

module.exports=ppuvarintake;

