const mongoose=require('mongoose');

const acalendernewschema = new mongoose.Schema({
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
activity: {
type: String
},
eventdate: {
type: Date
},
isactive: {
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
const acalendernew=mongoose.model('acalendernew',acalendernewschema);

module.exports=acalendernew;

