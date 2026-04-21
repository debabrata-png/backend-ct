const mongoose=require('mongoose');

const ppuaddinfonocschema = new mongoose.Schema({
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
daterefno: {
type: String
},
doa: {
type: Date
},
expdate: {
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
const ppuaddinfonoc=mongoose.model('ppuaddinfonoc',ppuaddinfonocschema);

module.exports=ppuaddinfonoc;

