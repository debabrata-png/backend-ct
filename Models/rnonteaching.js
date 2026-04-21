const mongoose=require('mongoose');

const rnonteachingschema = new mongoose.Schema({
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
staffname: {
type: String
},
department: {
type: String
},
designation: {
type: String
},
qualification: {
type: String
},
totalexperience: {
type: Number
},
aadhar: {
type: String
},
pan: {
type: String
},
email: {
type: String
},
phone: {
type: String
},
remarks: {
type: String
},
address: {
type: String
},
city: {
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
const rnonteaching=mongoose.model('rnonteaching',rnonteachingschema);

module.exports=rnonteaching;

