const mongoose=require('mongoose');

const nicubedschema = new mongoose.Schema({
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
    hcode: {
type: String
},
bedno: {
type: String
},
bedtype: {
type: String
},
amount: {
type: Number
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
type: {
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
const nicubed=mongoose.model('nicubed',nicubedschema);

module.exports=nicubed;

