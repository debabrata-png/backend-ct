const mongoose=require('mongoose');

const icuschema = new mongoose.Schema({
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
    title: {
type: String
},
code: {
type: String
},
location: {
type: String
},
capacity: {
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
const icu=mongoose.model('icu',icuschema);

module.exports=icu;

