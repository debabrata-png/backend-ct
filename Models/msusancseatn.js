const mongoose=require('mongoose');

const msusancseatnschema = new mongoose.Schema({
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
    univid: {
type: Number
},
program: {
type: String
},
programcode: {
type: String
},
year: {
type: String
},
sanc: {
type: Number
},
admitted: {
type: Number
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
const msusancseatn=mongoose.model('msusancseatn',msusancseatnschema);

module.exports=msusancseatn;

