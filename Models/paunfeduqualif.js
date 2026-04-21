const mongoose=require('mongoose');

const paunfeduqualifschema = new mongoose.Schema({
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
const paunfeduqualif=mongoose.model('paunfeduqualif',paunfeduqualifschema);

module.exports=paunfeduqualif;

