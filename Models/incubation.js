const mongoose=require('mongoose');

const incubationschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    incubationcenter: {
        type: String
    },
    incubationname: {
        type: String
    },
    yop: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    sponsoredby: {
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
const Incubation=mongoose.model('Incubation',incubationschema);

module.exports=Incubation;

