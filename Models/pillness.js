const mongoose=require('mongoose');

const pillnessschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
admid: {
type: String
},
illness: {
type: String
},
duration: {
type: String
},
doccomments: {
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
const pillness=mongoose.model('pillness',pillnessschema);

module.exports=pillness;

