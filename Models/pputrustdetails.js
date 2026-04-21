const mongoose=require('mongoose');

const pputrustdetailsschema = new mongoose.Schema({
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
    trustnameadrs: {
type: String
},
regno: {
type: String
},
dor: {
type: Date
},
familytrust: {
type: String
},
chairman: {
type: String
},
secretary: {
type: String
},
emailphone: {
type: String
},
resadrsphone: {
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
const pputrustdetails=mongoose.model('pputrustdetails',pputrustdetailsschema);

module.exports=pputrustdetails;

