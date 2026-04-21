const mongoose=require('mongoose');

const pfilesschema = new mongoose.Schema({
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
    metric: {
type: String
},
topic: {
type: String
},
description: {
type: String
},
source: {
type: String
},
datereceived: {
type: Date
},
accreditation: {
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
const pfiles=mongoose.model('pfiles',pfilesschema);

module.exports=pfiles;

