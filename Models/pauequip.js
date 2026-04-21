const mongoose=require('mongoose');

const pauequipschema = new mongoose.Schema({
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
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const pauequip=mongoose.model('pauequip',pauequipschema);

module.exports=pauequip;

