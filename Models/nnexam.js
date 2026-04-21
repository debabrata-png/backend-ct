const mongoose=require('mongoose');

const nnexamschema = new mongoose.Schema({
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
    item: {
type: String
},
status: {
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
const nnexam=mongoose.model('nnexam',nnexamschema);

module.exports=nnexam;

