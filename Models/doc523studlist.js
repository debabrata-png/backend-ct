const mongoose=require('mongoose');

const doc523studlistschema = new mongoose.Schema({
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
program: {
type: String
},
programcode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
category: {
type: String
},
exam: {
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
const doc523studlist=mongoose.model('doc523studlist',doc523studlistschema);

module.exports=doc523studlist;

