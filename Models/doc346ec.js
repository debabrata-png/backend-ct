const mongoose=require('mongoose');

const doc346ecschema = new mongoose.Schema({
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
faculty: {
type: String
},
course: {
type: String
},
link: {
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
const doc346ec=mongoose.model('doc346ec',doc346ecschema);

module.exports=doc346ec;

