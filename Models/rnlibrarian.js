const mongoose=require('mongoose');

const rnlibrarianschema = new mongoose.Schema({
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
librarianname: {
type: String
},
qualification: {
type: String
},
experience: {
type: Number
},
remarks: {
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
const rnlibrarian=mongoose.model('rnlibrarian',rnlibrarianschema);

module.exports=rnlibrarian;

