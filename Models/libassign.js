const mongoose=require('mongoose');

const libassignschema = new mongoose.Schema({
    accno: {
        type: String,
        required: [true,'Please enter accno'],
        unique: false
    },
    regno: {
        type: String
    },
    issuedate: {
        type: Date
    },
    duedate: {
        type: Date
    },
    returndate: {
        type: Date
    },
    fine: {
        type: Number
    },
    academicyear: {
        type: String
    },
    finestatus: {
        type: String
    },
    status: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Libassign=mongoose.model('Libassign',libassignschema);

module.exports=Libassign;

