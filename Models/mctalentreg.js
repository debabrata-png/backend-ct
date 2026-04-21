const mongoose=require('mongoose');

const mctalentregschema = new mongoose.Schema({
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
phone: {
type: String
},
email: {
type: String
},
guardian: {
type: String
},
gphone: {
type: String
},
payref: {
type: String
},
payname: {
type: String
},
paydate: {
type: Date
},
source: {
type: String
},
type: {
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
const mctalentreg=mongoose.model('mctalentreg',mctalentregschema);

module.exports=mctalentreg;

