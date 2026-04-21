const mongoose=require('mongoose');

const amadminstaffschema = new mongoose.Schema({
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
    Staff: {
type: String
},
dob: {
type: Date
},
doj: {
type: Date
},
designation: {
type: String
},
qualification: {
type: String
},
salary: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const amadminstaff=mongoose.model('amadminstaff',amadminstaffschema);

module.exports=amadminstaff;

