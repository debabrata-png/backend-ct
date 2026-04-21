const mongoose=require('mongoose');

const bfacyearschema = new mongoose.Schema({
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
department: {
type: String
},
programcode: {
type: String
},
faculty: {
type: String
},
designation: {
type: String
},
qualification: {
type: String
},
pgyear: {
type: String
},
phdyear: {
type: String
},
doj: {
type: Date
},
dol: {
type: Date
},
experience: {
type: Number
},
pan: {
type: String
},
unique: {
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
const bfacyear=mongoose.model('bfacyear',bfacyearschema);

module.exports=bfacyear;

