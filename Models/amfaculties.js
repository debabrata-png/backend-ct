const mongoose=require('mongoose');

const amfacultiesschema = new mongoose.Schema({
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
    faculty: {
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
phdmonyr: {
type: String
},
isqualified: {
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
const amfaculties=mongoose.model('amfaculties',amfacultiesschema);

module.exports=amfaculties;

