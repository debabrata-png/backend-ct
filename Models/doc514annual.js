const mongoose=require('mongoose');

const doc514annualschema = new mongoose.Schema({
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
committee: {
type: String
},
reportdate: {
type: Date
},
issues: {
type: String
},
action: {
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
const doc514annual=mongoose.model('doc514annual',doc514annualschema);

module.exports=doc514annual;

