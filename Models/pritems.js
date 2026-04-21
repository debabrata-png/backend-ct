const mongoose=require('mongoose');

const pritemsschema = new mongoose.Schema({
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
pr: {
type: String
},
prid: {
type: String
},
category: {
type: String
},
item: {
type: String
},
approvalstatus: {
type: String
},
type: {
type: String
},
level: {
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
const pritems=mongoose.model('pritems',pritemsschema);

module.exports=pritems;

