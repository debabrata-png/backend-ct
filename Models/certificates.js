const mongoose=require('mongoose');

const certificatesschema = new mongoose.Schema({
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
    type: {
type: String
},
document: {
type: String
},
refno: {
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
const certificates=mongoose.model('certificates',certificatesschema);

module.exports=certificates;

