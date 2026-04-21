const mongoose=require('mongoose');

const ptreatmentschema = new mongoose.Schema({
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
treatment: {
type: String
},
duration: {
type: String
},
followup: {
type: String
},
startdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const ptreatment=mongoose.model('ptreatment',ptreatmentschema);

module.exports=ptreatment;

