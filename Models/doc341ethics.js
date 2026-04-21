const mongoose=require('mongoose');

const doc341ethicsschema = new mongoose.Schema({
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
const doc341ethics=mongoose.model('doc341ethics',doc341ethicsschema);

module.exports=doc341ethics;

