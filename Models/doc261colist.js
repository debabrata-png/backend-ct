const mongoose=require('mongoose');

const doc261colistschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
course: {
type: String
},
coursecode: {
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
const doc261colist=mongoose.model('doc261colist',doc261colistschema);

module.exports=doc261colist;

