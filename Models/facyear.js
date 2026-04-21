const mongoose=require('mongoose');

const facyearschema = new mongoose.Schema({
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
programname: {
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
yoa: {
type: String
},
pan: {
type: String
},
empid: {
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
const facyear=mongoose.model('facyear',facyearschema);

module.exports=facyear;

