const mongoose=require('mongoose');

const doc7110reportschema = new mongoose.Schema({
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
    year: {
type: String
},
attribute: {
type: String
},
description: {
type: String
},
eventdate: {
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
const doc7110report=mongoose.model('doc7110report',doc7110reportschema);

module.exports=doc7110report;

