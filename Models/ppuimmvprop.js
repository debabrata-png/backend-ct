const mongoose=require('mongoose');

const ppuimmvpropschema = new mongoose.Schema({
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
    survno: {
type: String
},
landext: {
type: String
},
location: {
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
const ppuimmvprop=mongoose.model('ppuimmvprop',ppuimmvpropschema);

module.exports=ppuimmvprop;

