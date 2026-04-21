const mongoose=require('mongoose');

const hrsalstructureschema = new mongoose.Schema({
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
    structure: {
type: String
},
structureid: {
type: String
},
employee: {
type: String
},
empid: {
type: String
},
component: {
type: String
},
amount: {
type: Number
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
const hrsalstructure=mongoose.model('hrsalstructure',hrsalstructureschema);

module.exports=hrsalstructure;

