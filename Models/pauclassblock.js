const mongoose=require('mongoose');

const pauclassblockschema = new mongoose.Schema({
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
    blockname: {
type: String
},
blockarea: {
type: String
},
noofroom: {
type: Number
},
rooftype: {
type: String
},
capacity: {
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
const pauclassblock=mongoose.model('pauclassblock',pauclassblockschema);

module.exports=pauclassblock;

