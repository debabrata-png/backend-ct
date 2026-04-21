const mongoose=require('mongoose');

const nnmentorschema = new mongoose.Schema({
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
    mentornumber: {
type: Number
},
totalstudents: {
type: Number
},
totalmentees: {
type: Number
},
ratio: {
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
const nnmentor=mongoose.model('nnmentor',nnmentorschema);

module.exports=nnmentor;

