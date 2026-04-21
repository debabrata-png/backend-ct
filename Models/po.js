const mongoose=require('mongoose');

const poschema = new mongoose.Schema({
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
    programcode: {
        type: String,
        required: [true,'Please enter program code'],
        unique: false
    },
    programname: {
        type: String,
        required: [true,'Please enter program name'],
        unique: false
    },
    pocode: {
        type: String,
        required: [true,'Please enter PO code'],
        unique: false
    },
    po: {
        type: String,
        required: [true,'Please enter the value of PO'],
        unique: false
    }
})
//
const ProgramOutcome=mongoose.model('ProgramOutcome',poschema);

module.exports=ProgramOutcome;

