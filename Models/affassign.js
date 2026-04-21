const mongoose=require('mongoose');

const affassignschema = new mongoose.Schema({
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
    institutionid: {
type: Number
},
institution: {
type: String
},
insname: {
type: String
},
insuser: {
type: String
},
role: {
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
const affassign=mongoose.model('affassign',affassignschema);

module.exports=affassign;

