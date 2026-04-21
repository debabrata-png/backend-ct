const mongoose=require('mongoose');

const lpubarticlesschema = new mongoose.Schema({
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
    editionid: {
type: String
},
author: {
type: String
},
institution: {
type: String
},
article: {
type: String
},
description: {
type: String
},
abstractlink: {
type: String
},
articlelink: {
type: String
},
pubstatus: {
type: String
},
authortype: {
type: String
},
submitdate: {
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
const lpubarticles=mongoose.model('lpubarticles',lpubarticlesschema);

module.exports=lpubarticles;

