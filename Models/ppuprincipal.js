const mongoose=require('mongoose');

const ppuprincipalschema = new mongoose.Schema({
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
    degree: {
type: String
},
yop: {
type: String
},
marksobt: {
type: String
},
univname: {
type: String
},
spclz: {
type: String
},
dob: {
type: Date
},
age: {
type: Number
},
doj: {
type: Date
},
yearsofexpprof: {
type: String
},
yearsofexpind: {
type: String
},
totalexp: {
type: String
},
totalpay: {
type: String
},
ifqualpernorms: {
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
const ppuprincipal=mongoose.model('ppuprincipal',ppuprincipalschema);

module.exports=ppuprincipal;

