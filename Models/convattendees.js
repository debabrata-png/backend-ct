const mongoose=require('mongoose');

const convattendeesschema = new mongoose.Schema({
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
student: {
type: String
},
regno: {
type: String
},
program: {
type: String
},
passingyear: {
type: String
},
login: {
type: String
},
password: {
type: String
},
rank: {
type: String
},
grade: {
type: String
},
cgpa: {
type: Number
},
award: {
type: String
},
fees: {
type: Number
},
feedate: {
type: Date
},
refno: {
type: String
},
feemode: {
type: String
},
ghrequired: {
type: String
},
apprstatus: {
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
const convattendees=mongoose.model('convattendees',convattendeesschema);

module.exports=convattendees;

