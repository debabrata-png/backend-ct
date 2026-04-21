const mongoose=require('mongoose');

const doc212letterschema = new mongoose.Schema({
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
document: {
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
const doc212letter=mongoose.model('doc212letter',doc212letterschema);

module.exports=doc212letter;

