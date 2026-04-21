const mongoose=require('mongoose');

const notherstudschema = new mongoose.Schema({
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
    year: {
type: String
},
nonhomestudent: {
type: Number
},
foreignstudent: {
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
const notherstud=mongoose.model('notherstud',notherstudschema);

module.exports=notherstud;

