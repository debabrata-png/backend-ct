const mongoose=require('mongoose');

const ppulibautomationschema = new mongoose.Schema({
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
    isautomated: {
type: String
},
system: {
type: String
},
catlgsystem: {
type: String
},
facility: {
type: String
},
libtime: {
type: String
},
holiday: {
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
const ppulibautomation=mongoose.model('ppulibautomation',ppulibautomationschema);

module.exports=ppulibautomation;

