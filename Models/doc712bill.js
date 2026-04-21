const mongoose=require('mongoose');

const doc712billschema = new mongoose.Schema({
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
facility: {
type: String
},
buydate: {
type: String
},
groupbill: {
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
const doc712bill=mongoose.model('doc712bill',doc712billschema);

module.exports=doc712bill;

