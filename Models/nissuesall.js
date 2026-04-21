const mongoose=require('mongoose');

const nissuesallschema = new mongoose.Schema({
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
owner: {
type: String
},
owneremail: {
type: String
},
department: {
type: String
},
description: {
type: String
},
comments: {
type: String
},
createddate: {
type: Date
},
duedate: {
type: Date
},
status: {
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
const nissuesall=mongoose.model('nissuesall',nissuesallschema);

module.exports=nissuesall;

