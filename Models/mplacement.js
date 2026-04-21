const mongoose=require('mongoose');

const mplacementschema = new mongoose.Schema({
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
student: {
type: String
},
regno: {
type: String
},
phone: {
type: String
},
email: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
employer: {
type: String
},
empaddress: {
type: String
},
empcontact: {
type: String
},
salary: {
type: Number
},
type: {
type: String
},
doclink: {
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
const mplacement=mongoose.model('mplacement',mplacementschema);

module.exports=mplacement;

