const mongoose=require('mongoose');

const leaveapproverschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    role: {
        type: String
    },
    level: {
        type: Number
    },
    approveremail: {
        type: String
    },
    type: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Leaveapprover=mongoose.model('Leaveapprover',leaveapproverschema);

module.exports=Leaveapprover;

