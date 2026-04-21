const mongoose=require('mongoose');

const ppufinanceschema = new mongoose.Schema({
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
    endowmntcrtd: {
type: String
},
pan: {
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
const ppufinance=mongoose.model('ppufinance',ppufinanceschema);

module.exports=ppufinance;

