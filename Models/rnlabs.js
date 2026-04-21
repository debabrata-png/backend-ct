const mongoose=require('mongoose');

const rnlabsschema = new mongoose.Schema({
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
labtype: {
type: String
},
labsize: {
type: Number
},
simulatorno: {
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
const rnlabs=mongoose.model('rnlabs',rnlabsschema);

module.exports=rnlabs;

