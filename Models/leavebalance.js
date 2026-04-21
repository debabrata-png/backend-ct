const mongoose=require('mongoose');

const leavebalanceschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    total: {
        type: Number
    },
    approved: {
        type: Number
    },
    final: {
        type: Number
    },
    year: {
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
const Leavebalance=mongoose.model('Leavebalance',leavebalanceschema);

module.exports=Leavebalance;

