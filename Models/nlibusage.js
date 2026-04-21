const mongoose=require('mongoose');

const nlibusageschema = new mongoose.Schema({
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
teacherusage: {
type: Number
},
noofstudents: {
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
const nlibusage=mongoose.model('nlibusage',nlibusageschema);

module.exports=nlibusage;

