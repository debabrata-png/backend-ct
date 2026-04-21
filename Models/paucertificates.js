const mongoose=require('mongoose');

const paucertificatesschema = new mongoose.Schema({
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
    certiname: {
type: String
},
avail: {
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
const paucertificates=mongoose.model('paucertificates',paucertificatesschema);

module.exports=paucertificates;

