const mongoose=require('mongoose');

const doc121bosschema = new mongoose.Schema({
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
year: {
type: String
},
mdate: {
type: Date
},
regulation: {
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
const doc121bos=mongoose.model('doc121bos',doc121bosschema);

module.exports=doc121bos;

