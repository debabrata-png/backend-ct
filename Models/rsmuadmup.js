const mongoose=require('mongoose');

const rsmuadmupschema = new mongoose.Schema({
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
    program: {
type: String
},
progcode: {
type: Number
},
prognature: {
type: String
},
batch: {
type: String
},
acayear: {
type: String
},
currfstyrStudent: {
type: Number
},
currscndyrstu: {
type: Number
},
currthrdyrstu: {
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
const rsmuadmup=mongoose.model('rsmuadmup',rsmuadmupschema);

module.exports=rsmuadmup;

