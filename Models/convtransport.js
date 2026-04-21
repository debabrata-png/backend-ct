const mongoose=require('mongoose');

const convtransportschema = new mongoose.Schema({
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
convid: {
type: String
},
convocation: {
type: String
},
guest: {
type: String
},
clogin: {
type: String
},
from: {
type: String
},
to: {
type: String
},
traveldate: {
type: Date
},
type: {
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
const convtransport=mongoose.model('convtransport',convtransportschema);

module.exports=convtransport;

