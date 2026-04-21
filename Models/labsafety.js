const mongoose=require('mongoose');

const labsafetyschema = new mongoose.Schema({
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
    labname: {
type: String
},
safety: {
type: String
},
programname: {
type: String
},
programcode: {
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
const labsafety=mongoose.model('labsafety',labsafetyschema);

module.exports=labsafety;

