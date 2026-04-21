const mongoose=require('mongoose');

const pnirfschema = new mongoose.Schema({
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
    nirf: {
type: Number
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
const pnirf=mongoose.model('pnirf',pnirfschema);

module.exports=pnirf;

