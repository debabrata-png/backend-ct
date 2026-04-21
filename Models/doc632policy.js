const mongoose=require('mongoose');

const doc632policyschema = new mongoose.Schema({
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
policy: {
type: String
},
approvedon: {
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
const doc632policy=mongoose.model('doc632policy',doc632policyschema);

module.exports=doc632policy;

