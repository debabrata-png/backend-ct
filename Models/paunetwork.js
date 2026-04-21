const mongoose=require('mongoose');

const paunetworkschema = new mongoose.Schema({
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
    intake: {
type: Number
},
reqband: {
type: Number
},
availband: {
type: Number
},
noofnodes: {
type: Number
},
deficiency: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const paunetwork=mongoose.model('paunetwork',paunetworkschema);

module.exports=paunetwork;

