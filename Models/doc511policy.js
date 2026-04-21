const mongoose=require('mongoose');

const doc511policyschema = new mongoose.Schema({
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
    Scholarhsip: {
type: String
},
policy: {
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
const doc511policy=mongoose.model('doc511policy',doc511policyschema);

module.exports=doc511policy;

