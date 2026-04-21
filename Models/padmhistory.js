const mongoose=require('mongoose');

const padmhistoryschema = new mongoose.Schema({
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
activity: {
type: String
},
bedno: {
type: String
},
bedtype: {
type: String
},
activitydate: {
type: Date
},
doccomments: {
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
const padmhistory=mongoose.model('padmhistory',padmhistoryschema);

module.exports=padmhistory;

