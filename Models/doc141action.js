const mongoose=require('mongoose');

const doc141actionschema = new mongoose.Schema({
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
feedback: {
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
const doc141action=mongoose.model('doc141action',doc141actionschema);

module.exports=doc141action;

