const mongoose=require('mongoose');

const alumnijobsschema = new mongoose.Schema({
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
    org: {
type: String
},
title: {
type: String
},
role: {
type: String
},
description: {
type: String
},
location: {
type: String
},
description: {
type: String
},
startdate: {
type: Date
},
enddate: {
type: Date
},
contact: {
type: String
},
programname: {
type: String
},
batch: {
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
const alumnijobs=mongoose.model('alumnijobs',alumnijobsschema);

module.exports=alumnijobs;

