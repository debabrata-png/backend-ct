const mongoose=require('mongoose');

const aauc2schema = new mongoose.Schema({
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
    affiliation: {
type: String
},
program: {
type: String
},
type: {
type: String
},
year: {
type: String
},
sanction: {
type: Number
},
requested: {
type: Number
},
commno: {
type: String
},
apptype: {
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
const aauc2=mongoose.model('aauc2',aauc2schema);

module.exports=aauc2;

