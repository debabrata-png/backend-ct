const mongoose=require('mongoose');

const pauregrecschema = new mongoose.Schema({
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
    regname: {
type: String
},
maintained: {
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
const pauregrec=mongoose.model('pauregrec',pauregrecschema);

module.exports=pauregrec;

