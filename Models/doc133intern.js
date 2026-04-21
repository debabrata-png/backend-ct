const mongoose=require('mongoose');

const doc133internschema = new mongoose.Schema({
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
student: {
type: String
},
regno: {
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
const doc133intern=mongoose.model('doc133intern',doc133internschema);

module.exports=doc133intern;

