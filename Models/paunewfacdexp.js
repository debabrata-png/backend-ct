const mongoose=require('mongoose');

const paunewfacdexpschema = new mongoose.Schema({
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
email: {
type: String
},
mobile: {
type: Number
},
college: {
type: String
},
designation: {
type: String
},
doj: {
type: Date
},
dol: {
type: Date
},
expinyears: {
type: Number
},
expinmonths: {
type: Number
},
expindays: {
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
const paunewfacdexp=mongoose.model('paunewfacdexp',paunewfacdexpschema);

module.exports=paunewfacdexp;

