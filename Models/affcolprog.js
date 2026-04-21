const mongoose=require('mongoose');

const affcolprogschema = new mongoose.Schema({
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
    collegecode: {
type: String
},
college: {
type: String
},
collegeid: {
type: Number
},
department: {
type: String
},
program: {
type: String
},
programcode: {
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
const affcolprog=mongoose.model('affcolprog',affcolprogschema);

module.exports=affcolprog;

