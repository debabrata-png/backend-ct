const mongoose=require('mongoose');

const paunooftermlanschema = new mongoose.Schema({
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
    req: {
type: Number
},
avail: {
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
const paunooftermlan=mongoose.model('paunooftermlan',paunooftermlanschema);

module.exports=paunooftermlan;

