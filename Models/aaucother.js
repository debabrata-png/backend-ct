const mongoose=require('mongoose');

const aaucotherschema = new mongoose.Schema({
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
    anybreak: {
type: String
},
permanent: {
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
const aaucother=mongoose.model('aaucother',aaucotherschema);

module.exports=aaucother;

