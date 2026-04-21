const mongoose=require('mongoose');

const doc341billsschema = new mongoose.Schema({
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
software: {
type: String
},
amount: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc341bills=mongoose.model('doc341bills',doc341billsschema);

module.exports=doc341bills;

