const mongoose=require('mongoose');

const doc241sanctionschema = new mongoose.Schema({
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
const doc241sanction=mongoose.model('doc241sanction',doc241sanctionschema);

module.exports=doc241sanction;

