const mongoose=require('mongoose');

const paunnfcoeexpschema = new mongoose.Schema({
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
aur: {
type: Number
},
squadmember: {
type: Number
},
extexaminer: {
type: Number
},
evalscripts: {
type: Number
},
reeval: {
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
const paunnfcoeexp=mongoose.model('paunnfcoeexp',paunnfcoeexpschema);

module.exports=paunnfcoeexp;

