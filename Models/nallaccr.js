const mongoose=require('mongoose');

const nallaccrschema = new mongoose.Schema({
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
acreditation: {
type: String
},
criteria: {
type: String
},
qno: {
type: String
},
question: {
type: String
},
keywords: {
type: String
},
sequence: {
type: Number
},
doclink: {
type: String
},
type: {
type: String
},
level: {
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
const nallaccr=mongoose.model('nallaccr',nallaccrschema);

module.exports=nallaccr;

