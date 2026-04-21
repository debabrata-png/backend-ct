const mongoose=require('mongoose');

const norgdetailsschema = new mongoose.Schema({
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
    organization: {
type: String
},
address: {
type: String
},
state: {
type: String
},
country: {
type: String
},
pin: {
type: String
},
pan: {
type: String
},
gst: {
type: String
},
tan: {
type: String
},
gstapplicable: {
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
const norgdetails=mongoose.model('norgdetails',norgdetailsschema);

module.exports=norgdetails;

