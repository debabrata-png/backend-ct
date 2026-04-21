const mongoose=require('mongoose');

const doc351caschema = new mongoose.Schema({
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
document: {
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
const doc351ca=mongoose.model('doc351ca',doc351caschema);

module.exports=doc351ca;

