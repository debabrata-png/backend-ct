const mongoose=require('mongoose');

const hrstructuresalschema = new mongoose.Schema({
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
    stuctureid: {
type: String
},
structure: {
type: String
},
component: {
type: String
},
amount: {
type: Number
},
type: {
type: String
},
level: {
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
const hrstructuresal=mongoose.model('hrstructuresal',hrstructuresalschema);

module.exports=hrstructuresal;

