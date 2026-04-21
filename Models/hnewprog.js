const mongoose=require('mongoose');

const hnewprogschema = new mongoose.Schema({
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
    program: {
type: String
},
faculty: {
type: String
},
programcode: {
type: String
},
year: {
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
const hnewprog=mongoose.model('hnewprog',hnewprogschema);

module.exports=hnewprog;

