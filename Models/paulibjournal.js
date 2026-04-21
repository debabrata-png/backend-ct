const mongoose=require('mongoose');

const paulibjournalschema = new mongoose.Schema({
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
    degree: {
type: String
},
course: {
type: String
},
type: {
type: String
},
req: {
type: Number
},
avail: {
type: Number
},
deficiency: {
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
const paulibjournal=mongoose.model('paulibjournal',paulibjournalschema);

module.exports=paulibjournal;

