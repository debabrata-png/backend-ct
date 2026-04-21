const mongoose=require('mongoose');

const nnratioschema = new mongoose.Schema({
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
    ugstudents: {
type: Number
},
pgstudents: {
type: Number
},
teachers: {
type: Number
},
ugratio: {
type: String
},
pgratio: {
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
const nnratio=mongoose.model('nnratio',nnratioschema);

module.exports=nnratio;

