const mongoose=require('mongoose');

const sssstudschema = new mongoose.Schema({
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
    student: {
type: String
},
gender: {
type: String
},
category: {
type: String
},
domicile: {
type: String
},
nationality: {
type: String
},
email: {
type: String
},
level: {
type: String
},
discipline: {
type: String
},
department: {
type: String
},
course: {
type: String
},
regno: {
type: String
},
mobile: {
type: String
},
joinyear: {
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
const sssstud=mongoose.model('sssstud',sssstudschema);

module.exports=sssstud;

