const mongoose=require('mongoose');

const nlubillsschema = new mongoose.Schema({
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
facultyname: {
type: String
},
billdetails: {
type: String
},
organisation: {
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
const nlubills=mongoose.model('nlubills',nlubillsschema);

module.exports=nlubills;

