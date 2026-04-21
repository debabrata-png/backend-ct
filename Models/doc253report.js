const mongoose=require('mongoose');

const doc253reportschema = new mongoose.Schema({
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
const doc253report=mongoose.model('doc253report',doc253reportschema);

module.exports=doc253report;

