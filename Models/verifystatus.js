const mongoose=require('mongoose');

const verifystatusschema = new mongoose.Schema({
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
    criteria: {
type: String
},
metric: {
type: String
},
department: {
type: String
},
category: {
type: String
},
docid: {
type: String
},
comments: {
type: String
},
status: {
type: String
},
datechecked: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const verifystatus=mongoose.model('verifystatus',verifystatusschema);

module.exports=verifystatus;

