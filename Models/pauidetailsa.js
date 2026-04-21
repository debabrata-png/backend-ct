const mongoose=require('mongoose');

const pauidetailsaschema = new mongoose.Schema({
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
address: {
type: String
},
pincode: {
type: String
},
year: {
type: String
},
insttype: {
type: String
},
category: {
type: String
},
clgtype: {
type: String
},
ifauto: {
type: String
},
isfunct: {
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
const pauidetailsa=mongoose.model('pauidetailsa',pauidetailsaschema);

module.exports=pauidetailsa;

