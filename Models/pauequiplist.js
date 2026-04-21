const mongoose=require('mongoose');

const pauequiplistschema = new mongoose.Schema({
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
const pauequiplist=mongoose.model('pauequiplist',pauequiplistschema);

module.exports=pauequiplist;

