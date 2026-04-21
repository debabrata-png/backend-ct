const mongoose=require('mongoose');

const ppucompaddsoftschema = new mongoose.Schema({
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
    software: {
type: String
},
typeoflicense: {
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
const ppucompaddsoft=mongoose.model('ppucompaddsoft',ppucompaddsoftschema);

module.exports=ppucompaddsoft;

