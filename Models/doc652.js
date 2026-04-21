const mongoose=require('mongoose');

const doc652schema = new mongoose.Schema({
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
accreditation: {
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
const doc652=mongoose.model('doc652',doc652schema);

module.exports=doc652;

