const mongoose=require('mongoose');

const rsmubuildetaschema = new mongoose.Schema({
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
    name: {
type: String
},
floor: {
type: Number
},
room: {
type: Number
},
size: {
type: Number
},
assigned: {
type: String
},
classroom: {
type: String
},
classroom2: {
type: String
},
lab: {
type: String
},
lab2: {
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
const rsmubuildeta=mongoose.model('rsmubuildeta',rsmubuildetaschema);

module.exports=rsmubuildeta;

