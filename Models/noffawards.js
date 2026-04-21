const mongoose=require('mongoose');

const noffawardsschema = new mongoose.Schema({
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
institution: {
type: String
},
event: {
type: String
},
award: {
type: String
},
currentprogram: {
type: String
},
student: {
type: String
},
department: {
type: String
},
studentregno: {
type: String
},
studentcontact: {
type: String
},
selectiondate: {
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
const noffawards=mongoose.model('noffawards',noffawardsschema);

module.exports=noffawards;

