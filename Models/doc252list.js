const mongoose=require('mongoose');

const doc252listschema = new mongoose.Schema({
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
program: {
type: String
},
programcode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
type: {
type: String
},
total: {
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
const doc252list=mongoose.model('doc252list',doc252listschema);

module.exports=doc252list;

