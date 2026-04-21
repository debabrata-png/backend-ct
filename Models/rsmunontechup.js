const mongoose=require('mongoose');

const rsmunontechupschema = new mongoose.Schema({
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
    ctg: {
type: String
},
dept: {
type: String
},
dob: {
type: Date
},
sex: {
type: String
},
doj: {
type: Date
},
edqual: {
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
const rsmunontechup=mongoose.model('rsmunontechup',rsmunontechupschema);

module.exports=rsmunontechup;

