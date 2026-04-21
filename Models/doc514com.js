const mongoose=require('mongoose');

const doc514comschema = new mongoose.Schema({
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
    committee: {
type: String
},
members: {
type: String
},
contact: {
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
const doc514com=mongoose.model('doc514com',doc514comschema);

module.exports=doc514com;

