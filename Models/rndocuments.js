const mongoose=require('mongoose');

const rndocumentsschema = new mongoose.Schema({
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
const rndocuments=mongoose.model('rndocuments',rndocumentsschema);

module.exports=rndocuments;

