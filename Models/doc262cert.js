const mongoose=require('mongoose');

const doc262certschema = new mongoose.Schema({
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
report: {
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
const doc262cert=mongoose.model('doc262cert',doc262certschema);

module.exports=doc262cert;

