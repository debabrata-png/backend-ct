const mongoose=require('mongoose');

const doc133bosschema = new mongoose.Schema({
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
    department: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
bosdate: {
type: Date
},
year: {
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
const doc133bos=mongoose.model('doc133bos',doc133bosschema);

module.exports=doc133bos;

