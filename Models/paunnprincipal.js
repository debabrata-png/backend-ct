const mongoose=require('mongoose');

const paunnprincipalschema = new mongoose.Schema({
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
    name: {
type: String
},
dob: {
type: Date
},
age: {
type: String
},
fathername: {
type: String
},
degree: {
type: String
},
course: {
type: String
},
classobt: {
type: String
},
phdtitle: {
type: String
},
doj: {
type: Date
},
experience: {
type: String
},
officephn: {
type: String
},
resphn: {
type: String
},
fax: {
type: String
},
mobprsnl: {
type: String
},
email: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
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
const paunnprincipal=mongoose.model('paunnprincipal',paunnprincipalschema);

module.exports=paunnprincipal;

