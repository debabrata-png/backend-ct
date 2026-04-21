const mongoose=require('mongoose');

const doc341researchschema = new mongoose.Schema({
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
    committee: {
type: String
},
consdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc341research=mongoose.model('doc341research',doc341researchschema);

module.exports=doc341research;

