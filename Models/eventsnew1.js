const mongoose=require('mongoose');

const eventsnew1schema = new mongoose.Schema({
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
event: {
type: String
},
department: {
type: String
},
startdate: {
type: Date
},
description: {
type: String
},
brochurelink: {
type: String
},
reportlink: {
type: String
},
coordinator: {
type: String
},
type: {
type: String
},
level: {
type: String
},
collab: {
type: String
},
moulink: {
type: String
},
participants: {
type: Number
},
duration: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const eventsnew1=mongoose.model('eventsnew1',eventsnew1schema);

module.exports=eventsnew1;

