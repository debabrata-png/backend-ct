const mongoose=require('mongoose');

const nnvacstudschema = new mongoose.Schema({
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
studentname: {
type: String
},
totalstudents: {
type: Number
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
const nnvacstud=mongoose.model('nnvacstud',nnvacstudschema);

module.exports=nnvacstud;

