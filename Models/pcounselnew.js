const mongoose=require('mongoose');

const pcounselnewschema = new mongoose.Schema({
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
phone: {
type: String
},
contact: {
type: String
},
illness: {
type: String
},
treatment: {
type: String
},
surgery: {
type: String
},
amount: {
type: Number
},
mdate: {
type: Date
},
followupdate: {
type: Date
},
doctorref: {
type: String
},
doctor: {
type: String
},
assignedto: {
type: String
},
leadstatus: {
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
const pcounselnew=mongoose.model('pcounselnew',pcounselnewschema);

module.exports=pcounselnew;

