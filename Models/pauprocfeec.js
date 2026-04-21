const mongoose=require('mongoose');

const pauprocfeecschema = new mongoose.Schema({
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
    nofbankwithbranch: {
type: String
},
accno: {
type: Number
},
accname: {
type: String
},
ifsccode: {
type: String
},
micrcode: {
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
const pauprocfeec=mongoose.model('pauprocfeec',pauprocfeecschema);

module.exports=pauprocfeec;

