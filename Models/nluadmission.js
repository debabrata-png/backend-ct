const mongoose=require('mongoose');

const nluadmissionschema = new mongoose.Schema({
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
programname: {
type: String
},
sancseat: {
type: Number
},
admtdseat: {
type: Number
},
rsrvcatsanc: {
type: Number
},
rsrvcatadmtd: {
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
const nluadmission=mongoose.model('nluadmission',nluadmissionschema);

module.exports=nluadmission;

