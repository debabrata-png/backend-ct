const mongoose=require('mongoose');

const poactionsschema = new mongoose.Schema({
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
    po: {
        type: String
    },
    target: {
        type: Number
    },
    actual: {
        type: Number
    },
    academicyear: {
        type: String
    },
    observations: {
        type: String
    },
    department: {
        type: String
    },
    program: {
        type: String
    },
    comments: {
        type: String
    },
    status1: {
        type: String
    }
})
//
const Poactions=mongoose.model('Poactions',poactionsschema);

module.exports=Poactions;

