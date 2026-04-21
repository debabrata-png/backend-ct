const mongoose=require('mongoose');

const psurgeryschema = new mongoose.Schema({
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
admid: {
type: String
},
surgery: {
type: String
},
doctor: {
type: String
},
doctorid: {
type: String
},
sdate: {
type: Date
},
sstatus: {
type: String
},
doccmments: {
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
const psurgery=mongoose.model('psurgery',psurgeryschema);

module.exports=psurgery;

