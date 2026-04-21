const mongoose=require('mongoose');

const ppucertificatesschema = new mongoose.Schema({
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
    type: {
type: String
},
ifavl: {
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
const ppucertificates=mongoose.model('ppucertificates',ppucertificatesschema);

module.exports=ppucertificates;

