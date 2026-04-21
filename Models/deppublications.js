const mongoose=require('mongoose');

const deppublicationsschema = new mongoose.Schema({
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
    publication: {
        type: String
    },
    editor: {
        type: String
    },
    publisher: {
        type: String
    },
    department: {
        type: String
    },
    programname: {
        type: String
    },
    programcode: {
        type: String
    },
    year: {
        type: String
    },
    comments: {
        type: String
    },
    status1: {
        type: String
    },
    type: {
        type: String
    }
})
//
const Deppublications=mongoose.model('Deppublications',deppublicationsschema);

module.exports=Deppublications;

