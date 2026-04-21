const mongoose=require('mongoose');

const nticketsschema = new mongoose.Schema({
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
    issue: {
type: String
},
description: {
type: String
},
datecreated: {
type: Date
},
dateresolved: {
    type: Date
    },
assignedto: {
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
const ntickets=mongoose.model('ntickets',nticketsschema);

module.exports=ntickets;

