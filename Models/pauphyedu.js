const mongoose=require('mongoose');

const pauphyeduschema = new mongoose.Schema({
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
    description: {
type: String
},
details: {
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
const pauphyedu=mongoose.model('pauphyedu',pauphyeduschema);

module.exports=pauphyedu;

