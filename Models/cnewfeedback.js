const mongoose=require('mongoose');

const cnewfeedbackschema = new mongoose.Schema({
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
    presenter: {
type: String
},
pemail: {
type: String
},
meetingid: {
type: String
},
respondent: {
type: String
},
remail: {
type: String
},
rphone: {
type: String
},
submitteddate: {
type: Date
},
knowledge: {
type: Number
},
communication: {
type: Number
},
confidence: {
type: Number
},
understood: {
type: Number
},
satisfied: {
type: Number
},
response: {
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
const cnewfeedback=mongoose.model('cnewfeedback',cnewfeedbackschema);

module.exports=cnewfeedback;

