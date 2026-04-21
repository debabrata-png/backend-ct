const mongoose=require('mongoose');

const rsmuaddetacngschema = new mongoose.Schema({
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
const rsmuaddetacng=mongoose.model('rsmuaddetacng',rsmuaddetacngschema);

module.exports=rsmuaddetacng;

