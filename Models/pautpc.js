const mongoose=require('mongoose');

const pautpcschema = new mongoose.Schema({
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
    name: {
type: String
},
firstname: {
type: String
},
lastname: {
type: String
},
designation: {
type: String
},
department: {
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
const pautpc=mongoose.model('pautpc',pautpcschema);

module.exports=pautpc;

