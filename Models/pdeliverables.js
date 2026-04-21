const mongoose=require('mongoose');

const pdeliverablesschema = new mongoose.Schema({
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
    accreditation: {
type: String
},
year: {
type: String
},
topic: {
type: String
},
description: {
type: String
},
metric: {
type: String
},
dateuploaded: {
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
const pdeliverables=mongoose.model('pdeliverables',pdeliverablesschema);

module.exports=pdeliverables;

