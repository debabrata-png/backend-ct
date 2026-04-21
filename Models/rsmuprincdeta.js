const mongoose=require('mongoose');

const rsmuprincdetaschema = new mongoose.Schema({
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
    prinname: {
type: String
},
bday: {
type: Date
},
age: {
type: Number
},
fatherName: {
type: String
},
address: {
type: String
},
district: {
type: String
},
officeno: {
type: Number
},
faxno: {
type: Number
},
mobno: {
type: Number
},
email: {
type: String
},
ugprogram: {
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
const rsmuprincdeta=mongoose.model('rsmuprincdeta',rsmuprincdetaschema);

module.exports=rsmuprincdeta;

