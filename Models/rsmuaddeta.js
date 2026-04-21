const mongoose=require('mongoose');

const rsmuaddetaschema = new mongoose.Schema({
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
program: {
type: String
},
programcode: {
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
const rsmuaddeta=mongoose.model('rsmuaddeta',rsmuaddetaschema);

module.exports=rsmuaddeta;

