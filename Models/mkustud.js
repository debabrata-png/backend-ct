const mongoose=require('mongoose');

const mkustudschema = new mongoose.Schema({
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
    department: {
type: String
},
deptcode: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
student: {
type: String
},
studenttamil: {
type: String
},
regno: {
type: String
},
dob: {
type: Date
},
sex: {
type: String
},
pwd: {
type: String
},
community: {
type: String
},
comcert: {
type: String
},
aadhar: {
type: String
},
aspdistrict: {
type: String
},
rp: {
type: String
},
nri: {
type: String
},
mobile: {
type: String
},
email: {
type: String
},
scholarship: {
type: String
},
fellowship: {
type: String
},
internship: {
type: String
},
selfcourse: {
type: String
},
guardian: {
type: String
},
guardoccu: {
type: String
},
mother: {
type: String
},
address: {
type: String
},
guardmob: {
type: String
},
guardemail: {
type: String
},
anyother: {
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
const mkustud=mongoose.model('mkustud',mkustudschema);

module.exports=mkustud;

