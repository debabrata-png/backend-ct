const mongoose=require('mongoose');

const Patientschema = new mongoose.Schema({
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
    mrNumber: {
type: String
},
patient: {
type: String
},
age: {
type: Number
},
gender: {
type: String
},
phone: {
type: String
},
email: {
type: String
},
address: {
type: String
},
bloodGroup: {
type: String
},
username: {
type: String
},
password: {
type: String
},
dob: {
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
const Patient=mongoose.model('Patient',Patientschema);

module.exports=Patient;

