const mongoose=require('mongoose');

const paunewfeduqualifschema = new mongoose.Schema({
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
    faculty: {
type: String
},
email: {
type: String
},
mobile: {
type: Number
},
category: {
type: String
},
degree: {
type: String
},
spclztn: {
type: String
},
yop: {
type: String
},
colgname: {
type: String
},
univname: {
type: String
},
marks: {
type: String
},
classobt: {
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
const paunewfeduqualif=mongoose.model('paunewfeduqualif',paunewfeduqualifschema);

module.exports=paunewfeduqualif;

