const mongoose=require('mongoose');

const doc222teachersschema = new mongoose.Schema({
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
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc222teachers=mongoose.model('doc222teachers',doc222teachersschema);

module.exports=doc222teachers;

