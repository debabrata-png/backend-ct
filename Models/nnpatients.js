const mongoose=require('mongoose');

const nnpatientsschema = new mongoose.Schema({
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
outpatientno: {
type: Number
},
outpatientratio: {
type: String
},
inpatientno: {
type: Number
},
inpatientratio: {
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
const nnpatients=mongoose.model('nnpatients',nnpatientsschema);

module.exports=nnpatients;

