const mongoose=require('mongoose');

const doc351auditschema = new mongoose.Schema({
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
audit: {
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
const doc351audit=mongoose.model('doc351audit',doc351auditschema);

module.exports=doc351audit;

