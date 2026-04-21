const mongoose=require('mongoose');

const doc715policyschema = new mongoose.Schema({
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
    policy: {
type: String
},
description: {
type: String
},
approveddate: {
type: String
},
approvedby: {
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
const doc715policy=mongoose.model('doc715policy',doc715policyschema);

module.exports=doc715policy;

