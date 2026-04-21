const mongoose=require('mongoose');

const doc311coschema = new mongoose.Schema({
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
course: {
type: String
},
coursecode: {
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
const doc311co=mongoose.model('doc311co',doc311coschema);

module.exports=doc311co;

