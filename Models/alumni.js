const mongoose=require('mongoose');

const alumnischema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    learnerenr: {
        type: Number,
        required: [true,'Please enter no.of learners enrolled '],
        unique: false
    },
    totalpass: {
        type: Number,
        required: [true,'Please enter total no.of learners passed'],
        unique: false
    },
    

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const Alumni=mongoose.model('Alumni',alumnischema);

module.exports=Alumni;

