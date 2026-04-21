const mongoose=require('mongoose');

const paunfindexpschema = new mongoose.Schema({
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
orgname: {
type: String
},
designation: {
type: String
},
worknature: {
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
const paunfindexp=mongoose.model('paunfindexp',paunfindexpschema);

module.exports=paunfindexp;

