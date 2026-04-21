const mongoose=require('mongoose');

const paunequipschema = new mongoose.Schema({
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
    degree: {
type: String
},
course: {
type: String
},
semester: {
type: String
},
regulation: {
type: String
},
noflabsub: {
type: String
},
equipname: {
type: String
},
quant: {
type: Number
},
availquant: {
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
const paunequip=mongoose.model('paunequip',paunequipschema);

module.exports=paunequip;

