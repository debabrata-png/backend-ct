const mongoose=require('mongoose');

const pauboardaschema = new mongoose.Schema({
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
    title: {
type: String
},
firstname: {
type: String
},
lastname: {
type: String
},
position: {
type: String
},
examqualf: {
type: String
},
course: {
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
const pauboarda=mongoose.model('pauboarda',pauboardaschema);

module.exports=pauboarda;

