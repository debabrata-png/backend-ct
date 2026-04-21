const mongoose=require('mongoose');

const padmissionschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
admdate: {
type: Date
},
admtime: {
type: String
},
admstatus: {
type: String
},
doctor: {
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
const padmission=mongoose.model('padmission',padmissionschema);

module.exports=padmission;

