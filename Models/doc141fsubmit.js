const mongoose=require('mongoose');

const doc141fsubmitschema = new mongoose.Schema({
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
feedback: {
type: String
},
submittedto: {
type: String
},
submitdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc141fsubmit=mongoose.model('doc141fsubmit',doc141fsubmitschema);

module.exports=doc141fsubmit;

