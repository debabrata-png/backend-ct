const mongoose=require('mongoose');

const doc262annualschema = new mongoose.Schema({
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
report: {
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
const doc262annual=mongoose.model('doc262annual',doc262annualschema);

module.exports=doc262annual;

