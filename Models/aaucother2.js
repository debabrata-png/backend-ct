const mongoose=require('mongoose');

const aaucother2schema = new mongoose.Schema({
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
    permanent: {
type: String
},
reason: {
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
const aaucother2=mongoose.model('aaucother2',aaucother2schema);

module.exports=aaucother2;

