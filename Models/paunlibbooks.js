const mongoose=require('mongoose');

const paunlibbooksschema = new mongoose.Schema({
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
    volreq: {
type: Number
},
volavail: {
type: Number
},
voldef: {
type: Number
},
titlereq: {
type: Number
},
titleavail: {
type: Number
},
titledef: {
type: Number
},
voladdreq: {
type: Number
},
voladdavail: {
type: Number
},
voladddef: {
type: Number
},
totalreq: {
type: Number
},
totalavail: {
type: Number
},
totaldef: {
type: Number
},
alldef: {
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
const paunlibbooks=mongoose.model('paunlibbooks',paunlibbooksschema);

module.exports=paunlibbooks;

