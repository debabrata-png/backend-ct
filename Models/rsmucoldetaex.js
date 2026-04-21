const mongoose=require('mongoose');

const rsmucoldetaexschema = new mongoose.Schema({
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
    inclusec: {
type: String
},
letno: {
type: Number
},
entdate: {
type: Date
},
inclusec12: {
type: String
},
letno2: {
type: Number
},
entdate2: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const rsmucoldetaex=mongoose.model('rsmucoldetaex',rsmucoldetaexschema);

module.exports=rsmucoldetaex;

