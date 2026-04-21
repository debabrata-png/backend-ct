const mongoose=require('mongoose');

const tblerrorlogschema = new mongoose.Schema({
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
    domain: {
type: String
},
username: {
type: String
},
pagename: {
type: String
},
error: {
type: String
},
errordate: {
type: Date
},
type: {
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
const tblerrorlog=mongoose.model('tblerrorlog',tblerrorlogschema);

module.exports=tblerrorlog;

