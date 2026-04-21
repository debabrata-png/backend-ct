const mongoose=require('mongoose');

const convdocsschema = new mongoose.Schema({
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
convid: {
type: String
},
convocation: {
type: String
},
document: {
type: String
},
type: {
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
const convdocs=mongoose.model('convdocs',convdocsschema);

module.exports=convdocs;

