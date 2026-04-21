const mongoose=require('mongoose');

const affproglistschema = new mongoose.Schema({
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
programcode: {
type: String
},
stream: {
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
const affproglist=mongoose.model('affproglist',affproglistschema);

module.exports=affproglist;

