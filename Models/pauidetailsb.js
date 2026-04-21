const mongoose=require('mongoose');

const pauidetailsbschema = new mongoose.Schema({
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
    mobile: {
type: String
},
landline: {
type: String
},
other: {
type: String
},
fax: {
type: String
},
email: {
type: String
},
website: {
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
const pauidetailsb=mongoose.model('pauidetailsb',pauidetailsbschema);

module.exports=pauidetailsb;

