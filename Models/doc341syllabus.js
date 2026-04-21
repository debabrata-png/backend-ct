const mongoose=require('mongoose');

const doc341syllabusschema = new mongoose.Schema({
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
const doc341syllabus=mongoose.model('doc341syllabus',doc341syllabusschema);

module.exports=doc341syllabus;

